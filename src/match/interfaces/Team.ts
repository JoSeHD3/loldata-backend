import { Ban } from './Ban';
import { Objectives } from './Objectives';

export interface Team {
    bans: Ban[];
    objectives: Objectives;
    teamId: number;
    win: boolean;
}
