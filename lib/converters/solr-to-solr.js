module.exports = function() {
  var fillFakeLocation = function(doc) {
    doc["loq_level"] = "street_number"
    doc["loq_id"] = "brasil/sao-paulo/sao-caetano-do-sul/santa-paula/rua-maranhao/125"
    doc["street_number"] = doc["loq_id"]
    doc["route"] = doc["loq_id"].split("/").slice(0, 5).join("/")
    doc["neighbourhood"] = doc["loq_id"].split("/").slice(0, 4).join("/")
    doc["city"] = doc["loq_id"].split("/").slice(0, 3).join("/")
    doc["state"] = doc["loq_id"].split("/").slice(0, 2).join("/")
    doc["country"] = doc["loq_id"].split("/").slice(0, 1).join("/")
    console.log(doc)
    return doc
  }

  var convert = function(file) {
    return file.data["response"]["docs"].map(function(doc) {
      delete doc["_version_"]
      return fillFakeLocation(doc) 
    })
  }
  
  return {
    convert: convert
  }
}
