module.exports = function(options) {
  var fs = require('fs')
  var path = require('path');

  var eachFromDir = function(onSuccess) {
    fs.readdir(options.path, function(err, files) {
      if(err)
        console.log(err)
      else 
        files.forEach(onSuccess) 
    })
  }

  var eachFromMap = function(onSuccess) {
    var lineReader = require('readline').createInterface({
      input: fs.createReadStream(options.map.path)
    })
    lineReader.on('line', function(fileName) {
      onSuccess(fileName)
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

  var each = function(onSuccess) {
    if(options.map) eachFromMap(onSuccess)
    else eachFromDir(onSuccess)
  }
  
  return {
    each: each,
    read: read
  }
} 
