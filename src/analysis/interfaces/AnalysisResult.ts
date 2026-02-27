export interface AnalysisResult {
    avgGoldPerMinute: number;
    avgCsPerMinute: number;
    avgKda: number;
    avgVisionScore: number;
    characteristics: {
        avgCharacteristicVisionScore: number;
        avgCharacteristicFarmingScore: number;
        avgCharacteristicAggressionScore: number;
        avgCharacteristicObjectivesScore: number;
        avgCharacteristicSurvivabilityScore: number;
        avgCharacteristicMapImpactScore: number;
    };
}
