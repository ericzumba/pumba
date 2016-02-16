module.exports = function() {
  var country = function(data) {
    return data["results"]
  }

  var state = function(data) {
    return country(data) 
  }

  var city = function(data) {
    return state(data) 
  }

  var neighbourhood = function(data) {
    return city(data) 
  }

  var route = function(data) {
    return neighbourhood(data) 
  }

  var street_number = function(data) {
    return route(data) 
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
