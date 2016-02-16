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
          onSuccess({
            data: JSON.parse(data),
            filename: file
          }) 
      })
    }
  }
  
  return {
    each: each,
    read: read
  }
} 
