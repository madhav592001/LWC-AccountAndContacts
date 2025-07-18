public with sharing class FetchAccounts {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccounts(String searchAccountText){
        try {
            if(String.isEmpty(searchAccountText)) {
                return [SELECT Id, Name FROM Account];
            } else return [SELECT Id, Name FROM Account WHERE Name LIKE :('%' + searchAccountText + '%') ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> fetchContacts(String accountId){
        try { 
            return [SELECT Id, Name FROM Contact WHERE accountId = :accountId ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}