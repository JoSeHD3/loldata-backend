import { Match } from '../../match/interfaces/Match';
import { PlayerAnalysisData } from '../interfaces/PlayerAnalysisData';
import { calculateNormalizedAverage } from './calculateNormalizedAverage';

export const mapMatchToPlayerAnalysisData = (
    match: Match,
    puuid: string
): PlayerAnalysisData => {
    const player = match.info.participants.find(
        player => player.puuid === puuid
    );

    //TODO error handling
    if (!player) throw new Error('Player not found in a match');

    const { gameDuration } = match.info;
    const {
        totalMinionsKilled,
        neutralMinionsKilled,
        goldEarned,
        visionScore,
        wardsPlaced,
        wardsKilled,
        totalDamageDealtToChampions,
        damageDealtToObjectives,
        kills,
        assists,
        deaths,
        turretTakedowns,
        inhibitorTakedowns,
        totalDamageTaken,
    } = player;

    const minutes = gameDuration / 60;
    const cs = totalMinionsKilled + neutralMinionsKilled;
    const csPerMinute = cs / minutes;
    const goldPerMinute = goldEarned / minutes;
    const kda = (kills + assists) / deaths;
    const objectivesTaken = turretTakedowns + inhibitorTakedowns;
    const damageEfficiency = totalDamageTaken / totalDamageDealtToChampions;
    const deathsPerMinute = deaths / minutes;

    const characteristicVisionScore = calculateNormalizedAverage(
        [visionScore, wardsPlaced, wardsKilled],
        [
            'normalizedVisionScore',
            'normalizedWardsPlaced',
            'normalizedWardsDestroyed',
        ]
    );

    const characteristicFarmingScore = calculateNormalizedAverage(
        [csPerMinute, goldPerMinute],
        ['normalizedCsPerMinute', 'normalizedGoldPerMinute']
    );

    const characteristicAggressionScore = calculateNormalizedAverage(
        [kda, totalDamageDealtToChampions],
        ['normalizedKDA', 'normalizedDamageToChampions']
    );

    const characteristicObjectivesScore = calculateNormalizedAverage(
        [damageDealtToObjectives, objectivesTaken],
        ['normalizedDamageToObjectives', 'normalizedObjectivesTaken']
    );

    const characteristicSurvivabilityScore = calculateNormalizedAverage(
        [damageEfficiency, deathsPerMinute],
        ['normalizedDamageEfficiency', 'normalizedDeathsPerMinute']
    );

    const characteristicMapImpactScore = calculateNormalizedAverage(
        [kda],
        ['normalizedKDA']
    );

    console.log(
        'Characteristic map impact score: ',
        characteristicMapImpactScore
    );

    return {
        gameDuration,

        goldPerMinute,
        csPerMinute,

        kda,
        totalDamageDealtToChampions,

        damageDealtToObjectives,
        objectivesTaken,

        visionScore,

        characteristics: {
            characteristicVisionScore,
            characteristicFarmingScore,
            characteristicAggressionScore,
            characteristicObjectivesScore,
            characteristicSurvivabilityScore,
            characteristicMapImpactScore,
        },
    };
};
