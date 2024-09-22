import { LightningElement, api, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_NAME_FIELD from '@salesforce/schema/Opportunity.StageName';

export default class OpportunityPath extends LightningElement {
    @api recordId;

    currentStep = 'Qualification';
    isCoachingExpanded = false;
    pathItems = [];
    recordTypeId;

    get isDoneLoading() {
        return this.pathItems.length > 0 && this.currentStep;
    }

    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    processGetObjectInfo({ error, data }) {
        if (data) {
            this.recordTypeId = data.defaultRecordTypeId;
        }
        if (error) {
            console.log('error', error);
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: STAGE_NAME_FIELD })
    processGetPicklistValues({ error, data }) {
        if (data) {
            console.log('processGetPicklistValues', data);
            this.pathItems = data.values.map((picklistVal) => {
                return { label: picklistVal.label, value: picklistVal.value };
            });
        }
        if (error) {
            console.log('error', error);
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: STAGE_NAME_FIELD })
    processGetRecord({ error, data }) {
        console.log('processGetRecord', this.recordId, { error, data });
        if (data) {
            console.log('processGetRecord', data);
            this.currentStep = getFieldValue(data, STAGE_NAME_FIELD);
        }
        if (error) {
            console.log('processGetRecord error', error);
        }
    }

    get isQualifiedStage() {
        return this.currentStep === 'Qualification';
    }
    get isProspectingStage() {
        return this.currentStep === 'Prospecting';
    }

    handleStepFocus(event) {
        console.log('handleStepFocus', event.detail);
        this.currentStep = this.pathItems[event.detail.index].value;
        this.isCoachingExpanded = true;
    }

    toggleCoachingDetails() {
        this.isCoachingExpanded = !this.isCoachingExpanded;
    }
}
