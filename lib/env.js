module.exports = function(envName, onLoad){
  var files = require('./files')({
    path: './config'  
  })

  var config = files.read(function(file) {
    onLoad(file.data)
  })(envName + ".json")
}

