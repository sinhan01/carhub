import { LightningElement, api } from 'lwc';

export default class CarTile extends LightningElement {
    @api car={}

    handleClick(){
        const customEvent = new CustomEvent('selected', {
            detail : this.car.Id
        })
        this.dispatchEvent(customEvent)
    }
}