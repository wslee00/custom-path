import { api, LightningElement } from 'lwc';

export default class BasePath extends LightningElement {
    @api pathItems = [
        { label: 'Contacted', value: 'Contacted', isCurrent: true, isActive: true },
        { label: 'Open', value: 'Open', isComplete: false },
        { label: 'Unqualified', value: 'Unqualified', isComplete: false },
        { label: 'Nurturing', value: 'Nurturing', isComplete: false },
        { label: 'Closed', value: 'Closed', isComplete: false },
    ];

    isCoachingExpanded = false;

    get coachingDetailsButtonIcon() {
        return this.isCoachingExpanded ? 'utility:chevrondown' : 'utility:chevronright';
    }

    toggleCoachingDetails() {
        this.isCoachingExpanded = !this.isCoachingExpanded;
    }
}
