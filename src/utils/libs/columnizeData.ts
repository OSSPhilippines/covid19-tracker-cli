/**
 *
 * @param data An object containing your keys and values
 * @returns A 2 row column containing your keys and values
 */
export const columnizeData: (
    data: { [key: string]: string },
    padding?: number
) => string = (data, padding) => {
    // Generate table
    let table = "";

    // Create columns
    let normalizedArray: string[] = [];
    Object.keys(data).forEach((key) => {
        let value = data[key];
        let line = `${key.padEnd(15, " ")}| ${value.padEnd(13, " ")}`; // create a line with length 30;
        normalizedArray.push(line);
    });

    while (normalizedArray.length > 0) {
        let left = normalizedArray.shift();
        let right = normalizedArray.shift();

        //right may be undefined, so default to empty string
        if (right === undefined) right = "";

        table += `${left}${right}`;
        if (normalizedArray.length !== 0) table += `\n`; // do not add whitespace at the end of the table
    }

    if (padding !== undefined) {
        table = table
            .split("\n")
            .map((line) => " ".repeat(padding) + line)
            .join("\n");
    }

    return table;
};
