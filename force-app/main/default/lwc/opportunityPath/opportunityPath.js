import { LightningElement } from 'lwc';

export default class OpportunityPath extends LightningElement {
    pathItems = [
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualified', value: 'Qualified' },
        { label: 'Needs Analysis', value: 'Needs Analysis' },
        { label: 'Value Proposition', value: 'Value Proposition' },
        { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
        { label: 'Perception Analysis', value: 'Perception Analysis' },
        { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
        { label: 'Negotiation/Review', value: 'Negotiation/Review' },
        { label: 'Closed', value: 'Closed' },
    ];

    currentStep = 'Prospecting';
    isCoachingExpanded = false;

    handleStepFocus(event) {
        this.currentStep = this.pathItems[event.detail.index].value;
        this.isCoachingExpanded = true;
    }

    toggleCoachingDetails() {
        this.isCoachingExpanded = !this.isCoachingExpanded;
    }
}
