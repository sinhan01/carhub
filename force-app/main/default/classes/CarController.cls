public with sharing class CarController {

    //wrapper class
    public class Filters{
        @AuraEnabled
        public String searchKey{get;set;} 
        @AuraEnabled
        public Decimal maxPrice{get;set;}
        @AuraEnabled
        public String[] categories{get;set;}
        @AuraEnabled
        public String[] makeType{get;set;}

    }

    @AuraEnabled(cacheable=true)
    public static list<Car__c> getCars(Filters filters){
        String key, whereClause='';
        Decimal maxPrice;
        String[] categories, makeType;
        list<string> criteria = new list<string>{};

        if(filters != null){
            maxPrice = filters.maxPrice;
            makeType = filters.makeType;
            categories = filters.categories;
            
            if(!String.isEmpty(filters.searchKey)){
                key = '%'+filters.searchKey+'%';
                criteria.add('Name LIKE: key');
            }
            if(filters.maxPrice >= 0){
                criteria.add('MSRP__c <= :maxPrice');
            }
            if(filters.categories != null){
                criteria.add('Category__c IN :categories');
            }
            if(filters.makeType != null){
                criteria.add('Make__c IN :makeType');
            }
            if(criteria.size()>0){
                whereClause = ' WHERE ' + String.join(criteria, ' AND ');
            }
        }
        string query = 'select Id, Name,MSRP__c, Description__c, Category__c, Picture_URL__c from Car__C' + whereClause + ' WITH SECURITY_ENFORCED' +' ORDER BY NAME';
        return Database.query(query);
    }

    @AuraEnabled(cacheable=true)
    public static list<Car__c> getSimilarCars(Id carId, String[] makeType){
        List<String> v1 = makeType;
        return [select Id, Name,MSRP__c, Description__c, Category__c, Picture_URL__c, Make__c FROM Car__C where Make__c IN: v1 AND Id != :carId WITH SECURITY_ENFORCED];
    }
}
