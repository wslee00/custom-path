/**
 * Creates some sample data after creating a scratch org.
 */
Account testAccount = new Account(Name = 'Acme');
insert testAccount;
insert new Contact(LastName = 'Smith', AccountId = testAccount.Id);
insert new Opportunity(
    Name = 'Acme',
    StageName = 'Open',
    CloseDate = System.today(),
    AccountId = testAccount.Id
);
