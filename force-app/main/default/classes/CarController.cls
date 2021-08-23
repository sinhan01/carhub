public with sharing class CarController {
    @AuraEnabled(cacheable=true)

    public static list<Car__c> getCars(){
        return [select Id, Name,MSRP__c, Description__c, Category__c, Picture_URL__c from Car__C];
    }

}
