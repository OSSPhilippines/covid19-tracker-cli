/**
 *
 * @param str String that you want to capitalize
 * @returns String with first letter capitalized
 */
export const capitalizeFirstLetter: (str: string) => string = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
