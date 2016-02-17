module.exports = function(envName){
  var files = require('./files')({
    path: './config'  
  })

  var config = files.read(function(file) {
    console.log("aaaahh")
    console.log(file.data)
    return file.data
  })(envName + ".json")
  
  return config
}
