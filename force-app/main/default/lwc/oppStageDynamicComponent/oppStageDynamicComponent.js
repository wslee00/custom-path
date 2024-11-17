import { api, LightningElement } from 'lwc';
import { componentByStage } from './componentByStage';

export default class OppStageDynamicComponent extends LightningElement {
    @api recordId;
    @api
    get stageName() {
        return this._stageName;
    }
    set stageName(value) {
        this._stageName = value;
        this._setStageComponent();
    }

    isLoading = false;
    stageComponent;

    _stageName;

    get hasNoDynamicComponent() {
        return !this.stageComponent;
    }

    async _setStageComponent() {
        const componentName = componentByStage[this._stageName];
        if (!componentName) {
            this.stageComponent = null;
            return;
        }

        this.isLoading = true;
        const { default: componentImport } = await import(componentName);
        this.isLoading = false;
        this.stageComponent = componentImport;
    }

    handleRecordUpdate() {
        this.dispatchEvent(new CustomEvent('recordupdate'));
    }
}
