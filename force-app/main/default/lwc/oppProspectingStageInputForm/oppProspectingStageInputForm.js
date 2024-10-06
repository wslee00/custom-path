import { api, LightningElement } from 'lwc';

export default class OppProspectingStageInputForm extends LightningElement {
    @api recordId;

    isProcessing = false;

    handleError(event) {
        this.isProcessing = false;
        console.error('handleError', event.detail);
    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.StageName = 'Prospecting';
        this.isProcessing = true;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess() {
        this.isProcessing = false;
        this.dispatchEvent(new CustomEvent('recordupdate'));
    }
}
