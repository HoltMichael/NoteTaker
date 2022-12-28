public with sharing class NoteTakerUtils {

    @AuraEnabled(cacheable = true)
    public static List<SOSLResultIconWrapper> findRecords(String searchTerm){

        System.debug('search');
        System.debug(searchTerm);


        List<Note_Taker_SOSL_Object__mdt> returnObjects = [SELECT Label, Fields__c, Icon_Name__c FROM Note_Taker_SOSL_Object__mdt];

        String returnObjs = '';

        for(Note_Taker_SOSL_Object__mdt rec : returnObjects){
            returnObjs += rec.Label + '(' + rec.Fields__c + + '),';
        }

        returnObjs = returnObjs.left(returnObjs.length() - 1);
        String query = 'FIND \'' + searchTerm + '\' IN ALL FIELDS RETURNING ' + returnObjs;

        List<List<sObject>> resultList = Search.query(query);

        List<SOSLResultIconWrapper> SOSLResultsWithIcons = new List<SOSLResultIconWrapper>();
        for(Integer i = 0; i<resultList.size(); i++){
            SOSLResultsWithIcons.add(new SOSLResultIconWrapper(resultList[i], returnObjects[i].Icon_Name__c));
        }
        
        System.debug(resultList);
        return SOSLResultsWithIcons;
    }

    public class SOSLResultIconWrapper{
        @AuraEnabled
        public List<sObject> recordList;
        @AuraEnabled 
        public String iconName;

        public SOSLResultIconWrapper(List<sObject> records, String iconString){
            recordList = records;
            iconName = iconString.toLowerCase();
        }
    }

}
