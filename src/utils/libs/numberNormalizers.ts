/**
 * Takes a number, fixes it to 2 decimal places, and converts it into a string with a %
 * @param number Number that you want to convert to percentage
 * @returns String containing percentaged number
 */
export const convertToPercentage: (...args: number[]) => string[] = (
    ...args
) => {
    return args.map((number) => number.toFixed(2) + "%");
};

/**
 * Takes numbers and adds commas every 3 digits starting from the right
 * @param args Numbers that you want to normalize
 * @returns Array of strings containing the normalized numbers
 */
export const normalizeNumbers: (...args: number[]) => string[] = (...args) => {
    return args.map((number) =>
        number.toLocaleString("en-US", { maximumFractionDigits: 0 })
    );
};
