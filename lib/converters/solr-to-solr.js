module.exports = function() {
  var convert = function(file) {
    console.log(file)
    var doc = file.data["response"]["docs"][0]
    delete doc["_version_"]
    return doc 
  }
  
  return {
    convert: convert
  }
}
