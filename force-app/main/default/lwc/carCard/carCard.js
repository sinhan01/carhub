import { LightningElement } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Car__c.Name'
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c'
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c'
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c'
import CONTROL_FIELD from '@salesforce/schema/Car__c.Category__c'

import { getFieldValue } from 'lightning/uiRecordApi';
export default class CarCard extends LightningElement {

    recordId = 'a013g000004V6BJAA0'

    category_Field=CATEGORY_FIELD
    make_Field=MAKE_FIELD
    msrp_Field = MSRP_FIELD
    fuel_Field = FUEL_FIELD
    seats_Field = SEATS_FIELD
    control_Field = CONTROL_FIELD

    carName
    carPictureUrl

    handleRecordLoad(event){
        const {records} = event.detail
        const recordData = records[this.recordId]
        this.carName = getFieldValue(recordData, NAME_FIELD)
        this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD)
    }
}