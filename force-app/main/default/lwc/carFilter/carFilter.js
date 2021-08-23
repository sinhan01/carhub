import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

//car schema
import CAR_OBJECT from '@salesforce/schema/Car__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'

//contstants
const CATEGORY_ERROR = 'Error Loading category'
const MAKE_ERROR = 'Error Loading category'
export default class CarFilter extends LightningElement {

    categoryError = CATEGORY_ERROR
    makeError = MAKE_ERROR

    filters={
        searchKey:'',
        maxPrice:999999
    }
    /* fetching category and make picklists */

    @wire(getObjectInfo,{objectApiName:CAR_OBJECT})
    carObjectInfo

    @wire(getPicklistValues, {
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName:CATEGORY_FIELD
    })
    categories
    
    @wire(getPicklistValues, {
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName:MAKE_FIELD
    })
    makeType


    handleSearchKeyChange(event){
        console.log(event.target.value)
        this.filters ={...this.filters, "searchKey":event.target.value}
    }

    handleMaxPriceChange(event){
        console.log(event.target.value)
        this.filters ={...this.filters, "maxPrice":event.target.value}      
    }

    handleCheckBox(event){
        const {name,value} = event.target.dataset
        console.log('name', name)
        console.log('value', value)
    }
}