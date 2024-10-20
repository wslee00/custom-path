import getClosedOpportunityStages from '@salesforce/apex/OpportunityPathController.getClosedOpportunityStages';
import { api, LightningElement, wire } from 'lwc';

export default class OppClosedStageInputForm extends LightningElement {
    @api recordId;

    closedStageOptions;

    selectedStage;

    get isClosedWon() {
        return this.selectedStage === 'Closed Won';
    }

    @wire(getClosedOpportunityStages)
    processGetClosedOpportunityStages({ error, data }) {
        if (data) {
            this.closedStageOptions = data.map((closedOpportunityStage) => {
                return {
                    label: closedOpportunityStage.ApiName,
                    value: closedOpportunityStage.ApiName,
                };
            });
        }
        if (error) {
            console.error('error', error);
        }
    }

    handleStageChange(event) {
        this.selectedStage = event.detail.value;
    }
}
