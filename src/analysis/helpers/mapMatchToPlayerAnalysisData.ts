import { Match } from '../../match/interfaces/Match';
import { PlayerAnalysisData } from '../interfaces/PlayerAnalysisData';

export const mapMatchToPlayerAnalysisData = (
    match: Match,
    puuid: string
): PlayerAnalysisData => {
    const player = match.info.participants.find(
        player => player.puuid === puuid
    );

    //TODO error handling
    if (!player) throw new Error('Player not found in a match');

    const minutes = match.info.gameDuration / 60;
    const cs = player.totalMinionsKilled + player.neutralMinionsKilled;

    return {
        gameDuration: match.info.gameDuration,

        goldPerMinute: player.goldEarned / minutes,
        csPerMinute: cs / minutes,

        kda: (player.kills + player.assists) / player.deaths,
        damageToChampions: player.totalDamageDealtToChampions,

        damageToObjectives: player.damageDealtToObjectives,
        objectivesTaken: player.turretTakedowns + player.inhibitorTakedowns,

        visionScore: player.visionScore,
    };
};
