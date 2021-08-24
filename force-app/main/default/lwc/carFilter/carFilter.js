import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

//car schema
import CAR_OBJECT from '@salesforce/schema/Car__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'

//contstants
const CATEGORY_ERROR = 'Error Loading category'
const MAKE_ERROR = 'Error Loading category'

import { publish, MessageContext } from 'lightning/messageService';
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c'

export default class CarFilter extends LightningElement {

    categoryError = CATEGORY_ERROR
    makeError = MAKE_ERROR
    timer

    filters={
        searchKey:'',
        maxPrice:999999
    }
    /* Load Context from LMS */
    @wire(MessageContext)
    messageContext
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
        this.sendDataToCarList()
    }

    handleMaxPriceChange(event){
        console.log(event.target.value)
        this.filters ={...this.filters, "maxPrice":event.target.value}
        this.sendDataToCarList()      
    }

    handleCheckBox(event){
        if(!this.filters.categories){
            const categories = this.categories.data.values.map(item=>item.value)
            const makeType = this.makeType.data.values.map(item=>item.value)

            this.filters={...this.filters, categories:categories, makeType, makeType}


            console.log('this.filters',this.filters)
        }
        const {name,value} = event.target.dataset
        // console.log('name', name)
        // console.log('value', value)

        if(event.target.checked){
            if(!this.filters[name].includes(value)){
                this.filters[name] = [...this.filters[name], value]
            }
        }else{
            this.filters[name] = this.filters[name].filter(item=>item !== value)
        }
        this.sendDataToCarList()
    }

    sendDataToCarList(){
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(()=>{
            publish(this.messageContext, CARS_FILTERED_MESSAGE, {
                filters: this.filters
            })
        },500)
    }


}