module.exports = function(envName, converter, onLoad){
  var files = require('./files')({
    path: './config'  
  })

  var config = files.read(function(file) {
    var options = file.data
    options.converter = converter
    options.files = options[converter].files
    options.solr.core = options[converter].core
    onLoad(options)
  })(envName + ".json")
}

