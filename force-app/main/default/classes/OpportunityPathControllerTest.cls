@IsTest
private class OpportunityPathControllerTest {
    @IsTest
    static void should_get_opportunity_stages() {
        List<OpportunityStage> closedOpportunityStages = OpportunityPathController.getClosedOpportunityStages();
        System.assertEquals(2, closedOpportunityStages.size());
    }
}
