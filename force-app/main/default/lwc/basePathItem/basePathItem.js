import { api, LightningElement } from 'lwc';

export default class BasePathItem extends LightningElement {
    @api pathItem;

    get liClasses() {
        let classes = ['slds-path__item'];
        if (this.pathItem.isCurrent) {
            classes.push('slds-is-current');
        }
        if (this.pathItem.isActive) {
            classes.push('slds-is-active');
        } else {
            classes.push(this.pathItem.isComplete ? 'slds-is-complete' : 'slds-is-incomplete');
        }
        return classes.join(' ');
    }
}
