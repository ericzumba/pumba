module.exports = function() {
  var levels = [ 
    "country",
    "state",
    "city",
    "neighbourhood",
    "route",
    "street_number"
 ] 

  var fillLocations = function(doc) {
    var comps = doc["loq_id"].split("/") 
    doc["loq_level"] = levels[comps.length - 1] 
    comps.forEach(function(c, i) {
      doc[levels[i]] = comps.slice(0, i + 1).join("/")
    })
    return doc
  }

  var convert = function(file) {
    return file.data["response"]["docs"].map(function(doc) {
      delete doc["_version_"]
      doc["loq_id"] = "brasil/sao-paulo/sao-caetano-do-sul/santa-paula/rua-maranhao/125"
      return fillLocations(doc) 
    })
  }
  
  return {
    convert: convert
  }
}
