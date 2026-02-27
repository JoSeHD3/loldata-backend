import { normalizedData } from './normalizedData';

export const calculateNormalizedAverage = (
    values: number[],
    norms: (keyof typeof normalizedData)[]
): number => {
    const normalizedValues = values.map((value, index) => {
        const normKey = norms[index];
        const normValue = normalizedData[normKey];
        return (value / normValue) * 100;
    });

    const sum = normalizedValues.reduce((acc, val) => acc + val, 0);
    return sum / normalizedValues.length;
};
