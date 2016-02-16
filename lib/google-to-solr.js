module.exports = function() {
  var country = function(data) {
    return data
  }

  var state = function(data) {
    return data
  }

  var city = function(data) {
    return data
  }

  var neighbourhood = function(data) {
    return data
  }

  var route = function(data) {
    return data
  }

  var street_number = function(data) {
    return data
  }

  var converters = {
    "1": country,
    "2": state,
    "3": city,
    "4": neighbourhood,
    "5": route,
    "6": street_number
  }

  var convert = function(file) {
    return converters[file.filename.split(">").length](file.data)
  }

  return {
    convert: convert
  }
}
