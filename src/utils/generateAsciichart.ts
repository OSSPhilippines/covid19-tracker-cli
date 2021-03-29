import { plot } from "asciichart";

export const generateAsciichart: (data: number[]) => string = (data) => {
    // Divide the data by 100 since asciichart runs out of ram
    let casesArray: number[] = [];
    data.forEach((int) => {
        let divisible = int / 100;
        for (let i = 0; i < 2; i++) casesArray.push(divisible);
    });

    // Generate chart
    let chart = plot(casesArray, { height: 10 });

    // Get and normalize the floats
    let floatsInAsciiChart: string[] = chart.match(/[+-]?\d+(\.\d+)?/g)!; // Get floats from asciichart
    let properAmount: string[] = floatsInAsciiChart.map((strFloat) => {
        // Multiply the floats by 100
        let float = Math.round(parseFloat(strFloat) * 100);
        return float.toString();
    });

    // Replace floats with normalized version
    floatsInAsciiChart.forEach((key, index) => {
        let value = properAmount[index];
        chart = chart.replace(key, value);
    });

    return chart;
};
