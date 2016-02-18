module.exports = function() {
  var fillFakeLocation(doc) {
    doc["loq_level"] = "street_number"
    doc["loq_id"] = "brasil/sao-paulo/sao-caetano-do-sul/santa-paula/rua-maranhao/125"
    doc["street_number"] = doc["loq_id"]
    doc["route"] = doc["loq_id"].split("/").slice(0, 6)
    doc["neighbourhood"] = doc["loq_id"].split("/").slice(0, 5)
    doc["city"] = doc["loq_id"].split("/").slice(0, 4)
    doc["state"] = doc["loq_id"].split("/").slice(0, 3)
    doc["country"] = doc["loq_id"].split("/").slice(0, 2)
    return doc
  }

  var convert = function(file) {
    console.log(file.data)
    return file.data["response"]["docs"].map(function(doc) {
      console.log(doc)
      delete doc["_version_"]
      return fillFakeLocation(doc) 
    })
  }
  
  return {
    convert: convert
  }
}
