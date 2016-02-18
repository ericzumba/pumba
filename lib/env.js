module.exports = function(envName, converter, onLoad){
  var files = require('./files')({
    path: './config'  
  })

  var config = files.read(function(file) {
    var options = file.data
    options.converter = converter
    onLoad(options)
  })(envName + ".json")
}

