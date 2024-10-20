/**
 * Controller for opportunityPath lwc component
 */
public with sharing class OpportunityPathController {
    @AuraEnabled(cacheable=true)
    public static List<OpportunityStage> getClosedOpportunityStages() {
        return [
            SELECT ApiName, IsWon, IsClosed
            FROM OpportunityStage
            WHERE IsClosed = TRUE
            ORDER BY IsWon DESC
        ];
    }
}
