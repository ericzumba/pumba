module.exports = function(options) {
  var fs = require('fs')

  var each = function(onSuccess) {
    fs.readdir(options.path, function(err, files) {
      if(err)
        console.err(err)
      else 
        files.forEach(onSuccess) 
    })
  }
  
  return {
    each: each
  }
} 
