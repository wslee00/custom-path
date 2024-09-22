import { api, LightningElement } from 'lwc';

export default class BasePath extends LightningElement {
    @api currentStep;
    @api isCoachingExpanded = false;
    @api pathItems = [];

    get coachingDetailsButtonIcon() {
        return this.isCoachingExpanded ? 'utility:chevrondown' : 'utility:chevronright';
    }

    handleStepFocus(event) {
        this.dispatchEvent(new CustomEvent('stepfocus', { detail: event.detail }));
    }

    toggleCoachingDetails() {
        this.dispatchEvent(new CustomEvent('togglecoachingdetails'));
    }
}
