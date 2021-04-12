import blessed from "blessed";
import contrib from "blessed-contrib";
import { removeANSI } from "../../libs/generateTable";
import { welcomeMessage } from "../../libs/getResponses";
import { blessedConfig } from "./blessedConfig";
import { DashboardSize } from "./dashboardHandlers";

export interface LineDataObject {
    title: string;
    x: string[];
    y: number[];
    style: { line: string };
}

export interface DashboardFunctionInput {
    lineData: LineDataObject[];
    lineLabel: string;
    tableData: string;
    tableLabel: string;
    mapMarker?: {
        latitude: number;
        longitude: number;
        country: string;
    };
    donutData: { percent: number; label: string; color: string }[];
    barData: { titles: string[]; data: number[] };
}

class MockStdout {
    constructor(cols: number, rows: number) {
        this.columns = cols;
        this.rows = rows;
    }
    isTTY = true;
    columns: number;
    rows: number;
    write = () => {};
    on = () => {};
    removeListener = () => {};
}

export const generateDashboardOutput: (
    options: DashboardFunctionInput,
    size: DashboardSize
) => string = (
    {
        lineData,
        lineLabel,
        tableData,
        tableLabel,
        mapMarker,
        barData,
        donutData,
    },
    size
) => {
    const sizeConfig = blessedConfig[size];

    // Generate fake stdout
    const [mockX, mockY] = sizeConfig.mockStdout;
    const fakeStdout = new MockStdout(mockX, mockY);

    // We specify blessed to use a mock stdout otherwise it is going to render on process.stdout, which we don't want
    // We don't actually want blessed to render anything to the string since we want to use it to make graphics that will be rendered seperately
    // @ts-expect-error
    const screen = blessed.screen({ output: fakeStdout });

    // Touching the options here will also mess up with the screenshot function
    // Generally, making the numbers bigger will affect the response string because the stdout will take up more space
    // However, making the numbers smaller is just going to add invisible padding on the bottom and the right
    //
    // The values here control how much zoom blessed applies when rendering
    // Bigger numbers mean that blessed will be zoomed out more
    // while smaller numbers will be more zoom edin
    //
    // The more cols is bigger than rows, the more horizontally squished the output will become
    // The more rows is bigger than cols, the more vertically squished the output will become
    var grid = new contrib.grid({ cols: 18, rows: 20, screen });

    // Header box
    const [
        headerStartY,
        headerStartX,
        headerSpanY,
        headerSpanX,
    ] = sizeConfig.header.position;
    grid.set(
        headerStartY,
        headerStartX,
        headerSpanY,
        headerSpanX,
        blessed.box,
        {
            content:
                welcomeMessage +
                ". A curl-based command line tracker for the COVID-19 pandemic.",
        }
    );

    // Map box
    const [mapStartY, mapStartX, mapSpanY, mapSpanX] = sizeConfig.map.position;
    let map = grid.set(mapStartY, mapStartX, mapSpanY, mapSpanX, contrib.map, {
        label: "World Map",
    });
    if (mapMarker !== undefined) {
        let { country, latitude, longitude } = mapMarker;
        // @ts-ignore broken typings from blessed devs
        map.addMarker({
            lon: longitude,
            lat: latitude,
            color: "red",
            char: `X ${country}`,
        });
    }

    // Table box
    const [
        tableStartY,
        tableStartX,
        tableSpanY,
        tableSpanX,
    ] = sizeConfig.table.position;
    const tableXOffset = sizeConfig.table.tableXOffset;

    // Add padding to the table
    tableData = tableData
        .split("\n")
        .map((line) => " ".repeat(tableXOffset) + line)
        .join("\n");

    grid.set(tableStartY, tableStartX, tableSpanY, tableSpanX, blessed.box, {
        content: tableData,
        label: tableLabel,
    });

    // Bars box
    const [barStartY, barStartX, barSpanY, barSpanX] = sizeConfig.bar.position;

    let bar = grid.set(barStartY, barStartX, barSpanY, barSpanX, contrib.bar, {
        label: "Information",
        barWidth: 9,
        barSpacing: 9,
        xOffset: sizeConfig.bar.barXOffset,
        maxHeight: 9,
    });
    screen.append(bar);
    bar.setData(barData);

    // Donuts box
    const [
        donutStartY,
        donutStartX,
        donutSpanY,
        donutSpanX,
    ] = sizeConfig.donut.position;

    let donut = grid.set(
        donutStartY,
        donutStartX,
        donutSpanY,
        donutSpanX,
        contrib.donut,
        {
            label: "Percentages",
            radius: 8,
            arcWidth: 3,
            remainColor: "black",
            yPadding: 2,
        }
    );
    donut.setData(donutData);

    // Line
    const [
        lineStartY,
        lineStartX,
        lineSpanY,
        lineSpanX,
    ] = sizeConfig.line.position;

    let line = grid.set(
        lineStartY,
        lineStartX,
        lineSpanY,
        lineSpanX,
        contrib.line,
        {
            xLabelPadding: 3,
            xPadding: 5,
            showLegend: true,
            wholeNumbersOnly: false,
            label: lineLabel,
        }
    );
    line.setData(lineData);

    screen.render();

    // Take a screenshot
    const [screenshotX, screenshotY] = sizeConfig.screenshot;
    let response = screen.screenshot(0, screenshotX, 0, screenshotY);
    screen.destroy();

    response = removeUnneededLines(response);
    return response;
};

const removeUnneededLines: (str: string) => string = (str) => {
    // Split the input
    let splitLines = str.split("\n");

    // Lines with ansi removed
    let rawLines = splitLines.map((line) => {
        // If line contains a background color code then replace it with NON ansi string
        // This is mostly to preserve bars since they are just whitespace
        if (line.includes("\x1B[4")) line.replace("\x1B[4", "_");
        return removeANSI(line);
    });

    // This array represents the indexes of the lines in splitLines that are good and should be kept
    let goodLines: number[] = [];

    rawLines.forEach((line, index) => {
        // remove border
        line = line.replace(/│/g, "");

        // remove spaces
        line = line.replace(/\s/g, "");
        if (line.length !== 0) goodLines.push(index);
    });

    let response: string[] = [];
    splitLines.forEach((line, index) => {
        if (goodLines.includes(index)) response.push(line);
    });

    return response.join("\n");
};
