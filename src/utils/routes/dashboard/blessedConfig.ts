import { DashboardSize } from "./dashboardHandlers";

interface BlessedSizeConfiguration {
    // MOCKSTDOUT
    // Touching the arguments here will mess up with the screenshot function
    // Generally, making the numbers bigger will affect the response string because the output will take up more space
    // However, making the numbers smaller is just going to add invisible padding on the bottom and the right
    mockStdout: number[];
    screenshot: number[];

    // position: number[]
    // grid.set(a, b, c, d);
    // a = starting position across the y axis
    // b = starting position across the x axis
    // c = span across the y axis
    // d = span across the x axis
    header: {
        position: number[];
    };
    map: {
        position: number[];
    };
    table: {
        position: number[];
        tableXOffset: number;
    };
    bar: {
        position: number[];
        barXOffset: number;
    };
    donut: {
        position: number[];
    };
    line: {
        position: number[];
    };
}

// To the future person who has to touch this, may god have mercy on your soul
export const blessedConfig: {
    [key in DashboardSize]: BlessedSizeConfiguration;
} = {
    sm: {
        mockStdout: [180, 40],
        screenshot: [90, 36],
        header: {
            position: [0, 0, 4, 4],
        },
        map: {
            position: [0, 4, 4, 5],
        },
        table: {
            position: [4, 0, 4, 9],
            tableXOffset: 15,
        },
        bar: {
            position: [8, 0, 5, 5],
            barXOffset: 3,
        },
        donut: {
            position: [8, 5, 5, 4],
        },
        line: {
            position: [13, 0, 5, 9],
        },
    },
    md: {
        mockStdout: [340, 50],
        screenshot: [180, 34],
        header: {
            position: [0, 0, 4, 3],
        },
        map: {
            position: [4, 0, 5, 3],
        },
        table: {
            position: [0, 3, 4, 6],
            tableXOffset: 28,
        },
        bar: {
            position: [4, 3, 5, 3],
            barXOffset: 6,
        },
        donut: {
            position: [4, 6, 5, 3],
        },
        line: {
            position: [9, 0, 5, 9],
        },
    },
    lg: {
        mockStdout: [360, 50],
        screenshot: [180, 40],
        header: {
            position: [0, 0, 2, 9],
        },
        map: {
            position: [6, 0, 5, 3],
        },
        table: {
            position: [2, 0, 4, 9],
            tableXOffset: 60,
        },
        bar: {
            position: [6, 3, 5, 3],
            barXOffset: 8,
        },
        donut: {
            position: [6, 6, 5, 3],
        },
        line: {
            position: [11, 0, 5, 9],
        },
    },
};
