
const html = (data) => {
    return (`<!doctype html>
        <html>
            <head>
            <script src="/xterm/lib/xterm.js"></script>
            <script src='/xterm/addons/lib/xterm-addon-fit.js'></script>
            </head>
            <body>
            <div id="terminal" style='width: 105%;height: 100vh;padding-left: 2px;'></div>
            </body>
            <script>
                var term = new Terminal();
                var fitAddon = new FitAddon.FitAddon()
                term.loadAddon(fitAddon);
                term.open(document.getElementById('terminal'));
                fitAddon.fit();
                term.write('${data}')
            </script>
            <style>
                body{
                    background: #000; 
                    margin:0;padding:0;
                    overflow:hidden;
                }
                textarea, .xterm-char-measure-element, .xterm-scroll-area{
                    display: none;
                }
            </style>
        </html>`)
}

module.exports = html
