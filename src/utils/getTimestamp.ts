/**
 * @param timestamp Timestamp in Epoch Time
 * @returns String in form of As of MM/DD/YYYY, HH:mm:SS AM/PM [Date: MM/DD/YYYY]
 */
export const getTimestamp: (timestamp: number) => string = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString();
    const day = date.getUTCDate().toString();
    let hour: number | string = date.getUTCHours();
    const minute = date.getUTCMinutes().toString().padStart(2, "0");
    const second = date.getUTCSeconds().toString().padStart(2, "0");

    let ampm = hour > 11 ? "PM" : "AM";
    hour = ampm === "PM" ? hour - 12 : hour;
    hour = hour.toString().padStart(2, "0");

    const monthDayYear = `${month}/${day}/${year}`;
    const hourMinuteSecond = `${hour}:${minute}:${second}`;

    return `As of ${monthDayYear}, ${hourMinuteSecond} ${ampm} [Date: ${monthDayYear}]`;
};
