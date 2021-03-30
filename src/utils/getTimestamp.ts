/**
 *
 * @returns String in form of standard time
 */
export const getTimestamp = () => {
	let dateTime = new Date()
    return `As of ${dateTime}`;
};