module.exports = function(options) {
  var fs = require('fs')
  var path = require('path');

  var each = function(onSuccess) {
    fs.readdir(options.path, function(err, files) {
      if(err)
        console.log(err)
      else 
        files.forEach(onSuccess) 
    })
  }

  var read = function(onSuccess) {
    return function(file) {
      var filePath = path.join(options.path, file)
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
        if(err)
          console.log(err)
        else
          try {
            var json = JSON.parse(data)
            onSuccess({
              data: json,
              filename: file
            }) 
          } catch(e) {
            console.log("file read failed " + file)
            console.log(e)
          }
      })
    }
  }
  
  return {
    each: each,
    read: read
  }
} 
