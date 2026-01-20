import { Participant } from './Participant';
import { Team } from './Team';

export interface Match {
    metadata: {
        matchId: string;
        participants: string[];
    };
    info: {
        gameDuration: number;
        participants: Participant[];
        teams: Team[];
    };
}
