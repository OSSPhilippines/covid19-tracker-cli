import colors from "colors";
import { BoxArt, getBoxArt } from "./getBoxArt";

const removeANSI: (str: string) => string = (str) => {
    while (str.includes("\x1B")) {
        str = str.replace(/\u001b[^m]*?m/g, "");
    }
    return str;
};

/**
 * @param row An item from a string array
 * @param verticalLine The vertical line that is used to seperate the table
 * @returns A boolean that is true if the row contains the verticalLine param
 */
const checkIfTable: (
    row: string | undefined,
    verticalLine: string
) => boolean = (row, verticalLine) => {
    if (typeof row === "undefined" || row === undefined) return false;
    if (!row.includes(verticalLine)) return false;
    return true;
};

/**
 * @param row A string of a table
 * @param separator The separator used
 * @returns An array of numbers containing the positions of Separators
 */
const getPosOfSeparator: (row: string, separator: string) => number[] = (
    row,
    separator
) => {
    let response: number[] = [];
    // Temporarily replace color codes as it breaks string.length
    while (row.includes(separator)) {
        row = row.replace(separator, "│");
    }

    let charArray = row.split("");
    charArray.forEach((char, index) => {
        if (char === "│") {
            response.push(index);
        }
    });

    return response;
};

/**
 *
 * @param row The row to be checked to where the separators are
 * @param boxArt Object containing box art
 * @param cellSeparator The separator used in the table
 * @param intersectionSymbol The symbol to use for the intersections
 * @param isBottom If the separator is the bottom border of the table
 * @returns
 */
const getSeparator: (
    row: string,
    rowLength: number,
    boxArt: BoxArt,
    cellSeparator: string,
    intersectionSymbol: string,
    isBottom?: boolean
) => string = (
    row,
    rowLength,
    boxArt,
    cellSeparator,
    intersectionSymbol,
    isBottom
) => {
    // Handles if current and below are tables
    const positionsOfSeparator = getPosOfSeparator(row, cellSeparator); // Positions of separator
    let horizontal =
        isBottom === true ? boxArt.horizontal : boxArt.singleHorizontal;

    let mid: string[] = [];
    positionsOfSeparator.forEach((charPos) => {
        mid[charPos] = intersectionSymbol;
    });

    // Lines up the intersections with table intersection
    mid = Array.from(mid, (str) =>
        typeof str === "undefined" ? horizontal : str
    );

    // Add padding to the end of the mid array
    while (mid.length < rowLength) {
        mid.push(horizontal);
    }

    if (isBottom === true) {
        let separator = boxArt.bottomLeft + mid.join("") + boxArt.bottomRight;
        return separator;
    } else {
        let separator =
            boxArt.singleVerticallyMergeRight +
            mid.join("") +
            boxArt.singleVerticallyMergeLeft;
        return separator;
    }
};

/**
 * Handles the routing of where separators should go depending on if the current or next row is a table
 * @param rows The array of strings being printed into the table
 * @param index The index of the current row being printed
 * @param boxArt Object of colored boxart characters
 * @returns A separator
 */
const separatorHandler: (
    rows: string[],
    rowLength: number,
    index: number,
    boxArt: BoxArt,
    cellSeparator: string
) => string = (rows, rowLength, index, boxArt, cellSeparator) => {
    let isCurrentTable = checkIfTable(rows[index], cellSeparator);
    let isNextTable = checkIfTable(rows[index + 1], cellSeparator);

    if (index === rows.length - 1) {
        // Handles the bottom
        if (isCurrentTable) {
            return getSeparator(
                rows[index],
                rowLength,
                boxArt,
                cellSeparator,
                boxArt.horizontallyMergeSingleUp,
                true
            );
        }

        let separator =
            boxArt.bottomLeft +
            boxArt.horizontal.repeat(rowLength) +
            boxArt.bottomRight;
        return separator;
    }

    if (!isCurrentTable && !isNextTable) {
        // Handles if above and below are not tables;
        let separator =
            boxArt.singleVerticallyMergeRight +
            boxArt.singleHorizontal.repeat(rowLength) +
            boxArt.singleVerticallyMergeLeft;
        return separator;
    } else if (isCurrentTable && isNextTable) {
        // Handles if above and below are tables;
        return getSeparator(
            rows[index],
            rowLength,
            boxArt,
            cellSeparator,
            boxArt.singleIntersection
        );
    } else if (isCurrentTable) {
        // Handles if current row a table;
        return getSeparator(
            rows[index],
            rowLength,
            boxArt,
            cellSeparator,
            boxArt.singleHorizontallyMergeUp
        );
    } else if (isNextTable) {
        // Handles if next row a table;
        return getSeparator(
            rows[index + 1],
            rowLength,
            boxArt,
            cellSeparator,
            boxArt.singleHorizontallyMergeDown
        );
    }

    throw new Error("Separator handler conditions failed");
};

/**
 * Returns a table based on input
 *	@param data - Accepts an array containing either strings or string of arrays
 *	@param borderColor - String containing the color of the border. Must be compatible with the colors library
 * 	@example
 *	generateTable(["string", "another string", ["foo", "bar", "baz"], ["123", "456", "789"]], "green")
 */
export const generateTable: (
    data: (string | string[])[],
    borderColor: keyof colors.Color
) => string = (data, borderColor) => {
    let boxArt = getBoxArt(borderColor);

    // This determines how much to pad each cell of the table by to make the cells uniform
    let lengthOfCells: number[] = [];
    data.filter((row) => Array.isArray(row)).forEach((row) => {
        (row as string[]).forEach((cell, index) => {
            let stringLen = cell.length;
            if (
                lengthOfCells[index] === undefined ||
                lengthOfCells[index] < stringLen
            ) {
                lengthOfCells[index] = stringLen;
            }
        });
    });

    // Formats the table cells then pushes it to the rows array.
    let rows: string[] = [];
    data.forEach((row) => {
        if (Array.isArray(row)) {
            row = row.map((cell, index) => {
                let cellLength = lengthOfCells[index];
                return `${cell.padEnd(cellLength, " ")}`;
            });

            rows.push(row.join(` ${boxArt.singleVertical} `));
        } else {
            rows.push(row);
        }
    });

    // Add side to side padding for rows
    rows = rows.map((str) => ` ${str} `);

    // Determine the maximum row length
    let maxRowLength: number = 0;
    rows.forEach((row) => {
        // Temporarily replace color codes as it breaks string.length
        while (row.includes(boxArt.singleVertical)) {
            row = row.replace(boxArt.singleVertical, "│");
        }

        let rowLength = row.length;
        if (rowLength > maxRowLength) maxRowLength = rowLength;
    });

    // Pad all the rows to maximum length, color codes break string methods.
    rows = rows.map((row) => {
        let tempString = removeANSI(row);
        while (tempString.length < maxRowLength) {
            tempString += " ";
            row += " ";
        }

        return row;
    });

    // Generate final array of rows
    let finalRows: string[] = [
        `${boxArt.topLeft}${boxArt.horizontal.repeat(maxRowLength)}${
            boxArt.topRight
        }`,
    ];

    rows.forEach((row, index) => {
        finalRows.push(`${boxArt.vertical}${row}${boxArt.vertical}`);
        let separator = separatorHandler(
            rows,
            maxRowLength,
            index,
            boxArt,
            boxArt.singleVertical
        );

        if (!row.includes("┤")) {
            finalRows.push(separator);
        }
    });

    return finalRows.join("\n") + "\n";
};

/**
 * Returns a colored table based on input
 *	@param data - Accepts an array containing either strings or string of arrays
 *	@param borderColor - String containing the color of the border. Must be compatible with the colors library
 * 	@example
 *	generateTable(["string", "another string", ["foo", "bar", "baz"], ["123", "456", "789"]], "green")
 */
export const generateColorTable: (
    data: (string | string[])[],
    borderColor: keyof colors.Color
) => string = (data, borderColor) => {
    let clearData: (string | string[])[] = [];
    let conversionTable: { [key: string]: string } = {};

    data.forEach((row) => {
        if (Array.isArray(row)) {
            let cleanRow: string[] = [];
            row.forEach((cell) => {
                let cleanCell = removeANSI(cell);
                conversionTable[cleanCell] = cell;
                cleanRow.push(cleanCell);
            });
            clearData.push(cleanRow);
        } else {
            let cleanRow = removeANSI(row);
            conversionTable[cleanRow] = row;
            clearData.push(cleanRow);
        }
    });

    const clearTable = generateTable(clearData, borderColor);
    //console.log(clearTable, "was generated from", clearData);
    let colorTable = clearTable;
    let conversionKeys = Object.keys(conversionTable);

    conversionKeys.forEach((key) => {
        let value = conversionTable[key];
        colorTable = colorTable.replace(key, value);
    });

    return colorTable;
};
