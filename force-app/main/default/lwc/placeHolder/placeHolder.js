import { LightningElement,api } from 'lwc';
import CAR_HUB_PLACEHOLDER from '@salesforce/resourceUrl/carplaceholder'
export default class PlaceHolder extends LightningElement {

    @api message
    placeHolder = CAR_HUB_PLACEHOLDER
}