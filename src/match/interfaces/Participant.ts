export interface Participant {
    puuid: string;

    kills: number;
    deaths: number;
    assists: number;

    goldEarned: number;
    totalMinionsKilled: number;
    neutralMinionsKilled: number;

    totalDamageDealtToChampions: number;
    damageDealtToObjectives: number;
    totalDamageTaken: number;
    killParticipation: number;

    turretTakedowns: number;
    inhibitorTakedowns: number;

    visionScore: number;
    wardsKilled: number;
    wardsPlaced: number;
    detectorWardsPlaced: number;
    timePlayed: number;

    teamPosition: string;
    win: boolean;
}
