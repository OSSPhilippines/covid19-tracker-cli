const   parse   = require('xml2js').parseString,
        Viewer  = require('wopr/lib/document-viewer'),
        blessed = require('blessed'),
        contrib = require('blessed-contrib');


const present = (req, res, body, cba) => {
  
  blessed.Screen.global = null
  blessed.Program.global = null

  if (!body || body=="") {
       return cba("You must upload the document to present as the POST body")
  }
  
  parse(body, function (err, doc) {
    try {
      
      if (err) {
        return cba("Document xml is not valid: " + err)
      }
    
      if (!doc || !doc.document) return cba("document not valid or has no pages")
      if (!doc.document.page || doc.document.page.length==0) return cba("document must have at least one page")
      
      var screen = contrib.createScreen(req, res)
      if (screen==null) return
      
      viewer = new Viewer(doc.document, screen)
      var err = viewer.renderPage(0, '\u2800')
      if (err!==null) {
        clean(screen)
        return cba(err)
      }
      
      //note the setTimeout is necessary even if delay is 0
      setTimeout(function() {
        //restore cursor
        res.end('\033[?25h')
        clean(screen)
        return cba()
      }, '' ? 5000:0)
    }
    
    catch (e) {
      return cba(e)
    } 
  })
}

function clean(screen) {
  //TODO this code is very sensitive to blessed versions, need to check right version/usage
  //screen.program.destroy()
  //screen.destroy()
}

module.exports = present
