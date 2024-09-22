import { api, LightningElement } from 'lwc';

export default class BasePath extends LightningElement {
    @api currentStep = 'Contacted';
    @api pathItems = [
        { label: 'Contacted', value: 'Contacted' },
        { label: 'Open', value: 'Open' },
        { label: 'Unqualified', value: 'Unqualified' },
        { label: 'Nurturing', value: 'Nurturing' },
        { label: 'Closed', value: 'Closed' },
    ];

    isCoachingExpanded = false;

    get coachingDetailsButtonIcon() {
        return this.isCoachingExpanded ? 'utility:chevrondown' : 'utility:chevronright';
    }

    handleStepFocus(event) {
        console.log('stepfocus', event.detail);
        this.dispatchEvent(new CustomEvent('stepfocus', { detail: event.detail }));
    }

    toggleCoachingDetails() {
        this.isCoachingExpanded = !this.isCoachingExpanded;
    }
}
