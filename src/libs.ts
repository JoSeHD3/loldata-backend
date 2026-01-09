import { RiotRegion } from './types';

export const getRegionAPIName = (region: RiotRegion): string => {
    return `https://${region}.api.riotgames.com`;
};

export const isRiotRegion = (region: string): region is RiotRegion => {
    return ['eun1', 'euw1', 'na1', 'kr1'].includes(region);
};
