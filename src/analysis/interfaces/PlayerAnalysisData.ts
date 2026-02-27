export interface PlayerAnalysisData {
    gameDuration: number;

    goldPerMinute: number;
    csPerMinute: number;

    kda: number;
    totalDamageDealtToChampions: number;

    damageDealtToObjectives: number;
    objectivesTaken: number;

    visionScore: number;

    characteristics: {
        characteristicVisionScore: number;
        characteristicFarmingScore: number;
        characteristicAggressionScore: number;
        characteristicObjectivesScore: number;
        characteristicSurvivabilityScore: number;
        characteristicMapImpactScore: number;
    };
}
