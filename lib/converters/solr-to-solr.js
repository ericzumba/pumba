module.exports = function() {
  var convert = function(file) {
    return file.data["response"]["docs"].map(function(doc) {
      delete doc["_version_"]
      return doc
    })
  }
  
  return {
    convert: convert
  }
}
