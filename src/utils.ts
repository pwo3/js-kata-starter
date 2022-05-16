export const roundValue = (value: number, digits = 2) => Math.round(value * 10 ** digits) / 10 ** digits;
