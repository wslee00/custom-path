import { LightningElement, api, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_NAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import getClosedOpportunityStages from '@salesforce/apex/OpportunityPathController.getClosedOpportunityStages';

export default class OpportunityPath extends LightningElement {
    @api recordId;

    closedOpportunityStages;
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
            console.error('error', error);
        }
    }

    @wire(getClosedOpportunityStages)
    processGetClosedOpportunityStages({ error, data }) {
        if (data) {
            this.closedOpportunityStages = new Set();
            data.forEach((closedOpportunityStage) => {
                this.closedOpportunityStages.add(closedOpportunityStage.ApiName);
            });
        }
        if (error) {
            console.error('error', error);
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: STAGE_NAME_FIELD })
    processGetPicklistValues({ error, data }) {
        if (data) {
            this.pathItems = data.values.map((picklistVal) => {
                return { label: picklistVal.label, value: picklistVal.value };
            });
        }
        if (error) {
            console.error('error', error);
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: STAGE_NAME_FIELD })
    processGetRecord({ error, data }) {
        if (data) {
            this.currentStep = getFieldValue(data, STAGE_NAME_FIELD);
        }
        if (error) {
            console.error('processGetRecord error', error);
        }
    }

    get isQualifiedStage() {
        return this.currentStep === 'Qualification';
    }
    get isProspectingStage() {
        return this.currentStep === 'Prospecting';
    }

    handleRecordUpdate() {
        this.isCoachingExpanded = false;
        this.dispatchEvent(
            new ShowToastEvent({
                message: 'Opportunity has been updated',
                title: 'Success',
                variant: 'success',
            }),
        );
    }

    handleStepFocus(event) {
        this.currentStep = this.pathItems[event.detail.index].value;
        this.isCoachingExpanded = true;
    }

    toggleCoachingDetails() {
        this.isCoachingExpanded = !this.isCoachingExpanded;
    }
}
