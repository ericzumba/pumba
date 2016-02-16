module.exports = function() {
  var long_name = function(data, validName) {
    return data["results"][0]["address_components"].filter(function(comp) {
      return comp["types"].indexOf(validName) > -1
    }).map(function(comp) {
      return comp["long_name"]
    })[0]
  }

  var country = function(file) {
    return {
      id: file.filename, 
      level: "country",
      country: long_name(file.data, "country") 
    }
  }

  var state = function(file) {
    var me = country(file)
    me.level = "state"
    me.state = long_name(file.data, "administrative_area_level_1")
    return me 
  }

  var city = function(file) {
    var me = state(file) 
    me.level = "city"
    me.city = long_name(file.data, "locality")
    return me
  }

  var neighbourhood = function(file) {
    var me = city(file)
    me.level = "neighbourhood"
    me.neighbourhood = long_name(file.data, "sublocality")
    return me 
  }

  var route = function(file) {
    var me = neighbourhood(file)
    me.level = "route"
    me.route = long_name(file.data, "route")
    return me 
  }

  var street_number = function(file) {
    var me = route(file)
    me.level = "street_number"
    me.street_number = long_name(file.data, "street_number")
    return me 
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
    return converters[file.filename.split(">").length](file)
  }

  return {
    convert: convert
  }
}
