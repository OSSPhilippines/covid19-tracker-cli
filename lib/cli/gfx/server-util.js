/** Modified script from blessed-contrib server-util */
const blessed = require('blessed'),
      contrib = require('blessed-contrib'),
      Stream  = require('stream');

function OutputBuffer(options) { 
  this.isTTY = true;
  this.columns = options.cols;
  this.rows = options.rows;
  this.write = function(s) {
    s = s.replace('\x1b8', '');
    options.stream.write(s)
  };
  this.on = function() {};
}

function InputBuffer() {
  this.isTTY = true;
  this.isRaw = true;
  this.emit = function() {};
  this.setRawMode = function() {};
  this.resume = function() {};
  this.pause = function() {};
  this.on = function() {};
}

createScreen = (opt = {}) => { 
  const output = new OutputBuffer({stream: opt.stream, cols: 250, rows: 50});
  const input = new InputBuffer(); //required to run under forever since it replaces stdin to non-tty
  const program = blessed.program({output: output, input: input});
  let screen = blessed.screen({program: program});
  return screen
}

loadTemplate = (gridTemplateClass, gridStyleTemplateClass, json, callback) => {

    blessed.Screen.global = null
    blessed.Program.global = null

    const 
        customStream  =   new Stream.Transform()
        screen        =   createScreen({stream: customStream}),
        grid          =   new contrib.grid({rows: 12, cols: 14, screen: screen});

    let result        =   []

    if(!gridTemplateClass) throw new Error('No template loaded')

    // parse template
    gridTemplateClass.load(grid, json, gridStyleTemplateClass)

    customStream._transform = function (chunk,encoding,done) {
        result.push(chunk.toString())
        done()
    }

    customStream._final = () => {
        callback(result.join(''))
    }

    customStream.on('error', (e) => {
        // do nothing here
    })

    screen.render()

    setTimeout(() => {
        customStream.end()
    }, 1000)
} 

module.exports = {
  createScreen,
  loadTemplate,
}
