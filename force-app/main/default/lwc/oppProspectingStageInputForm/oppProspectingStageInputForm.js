import { api, LightningElement } from 'lwc';

export default class OppProspectingStageInputForm extends LightningElement {
    @api recordId;

    isProcessing = false;

    handleError(event) {
        this.isProcessing = false;
        console.error('handleError', event.detail);
    }

    handleSubmit() {
        this.isProcessing = true;
    }

    handleSuccess() {
        this.isProcessing = false;
        this.dispatchEvent(new CustomEvent('recordupdate'));
    }
}
