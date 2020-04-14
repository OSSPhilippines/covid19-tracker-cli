const ansi = require("ansi-styles");

const color = {
  tblclr: (border) => ansi.cyan.open + border + ansi.cyan.close,
  white: (txt) => ansi.white.open + txt + ansi.white.close,
  black: (txt) => ansi.black.open + txt + ansi.black.close,
  green: (txt) => ansi.green.open + txt + ansi.green.close,
  cyan: (txt) => ansi.cyan.open + txt + ansi.cyan.close,
  magenta: (txt) => ansi.magenta.open + txt + ansi.magenta.close,
  yellow: (txt) => ansi.yellow.open + txt + ansi.yellow.close,
  red: (txt) => ansi.red.open + txt + ansi.red.close,
  cyanBright: (txt) => ansi.cyanBright.open + txt + ansi.cyanBright.close,
  magentaBright: (txt) =>
    ansi.magentaBright.open + txt + ansi.magentaBright.close,
  redBright: (txt) => ansi.redBright.open + txt + ansi.redBright.close,
  greenBright: (txt) => ansi.greenBright.open + txt + ansi.greenBright.close,
  cyanBG: (txt) => ansi.bgCyan.open + txt + ansi.bgCyan.close,
};
exports.color = color;

exports.txt = {
  line: "-".repeat(60),
  tab: "    ",
  space: " ",
  br: "\n",
};

exports.formatNumber = (value) =>
  value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
exports.ucfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

exports.table = {
  borders: {
    top: color.tblclr("═"),
    "top-mid": color.tblclr("╤"),
    "top-left": color.tblclr("╔"),
    "top-right": color.tblclr("╗"),
    bottom: color.tblclr("═"),
    "bottom-mid": color.tblclr("╧"),
    "bottom-left": color.tblclr("╚"),
    "bottom-right": color.tblclr("╝"),
    left: color.tblclr("║"),
    "left-mid": color.tblclr("╟"),
    mid: color.tblclr("─"),
    "mid-mid": color.tblclr("┼"),
    right: color.tblclr("║"),
    "right-mid": color.tblclr("╢"),
    middle: color.tblclr("│"),
  },
  col5: (txt) => {
    return { colSpan: 5, content: txt };
  },
};
