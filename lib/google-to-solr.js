module.exports = function() {
  var slug = require('./slug')()

  var long_name = function(data, validName) {
    return data["results"][0]["address_components"].filter(function(comp) {
      return comp["types"].indexOf(validName) > -1
    }).map(function(comp) {
      return comp["long_name"]
    })[0]
  }

  var formatted_address = function(data) {
    return data["results"][0]["formatted_address"]
  }

  var lat = function(data) {
    return data["results"][0]["geometry"]["location"]["lat"]
  }

  var lng = function(data) {
    return data["results"][0]["geometry"]["location"]["lng"]
  }

  var common = function(file) {
    return {
      comps: [], 
      formatted_address: formatted_address(file.data),
      lat: lat(file.data),
      lng: lng(file.data)
    }
  }

  var country = function(file) {
    var me = common(file)
    me.level = "country"
    me.country = long_name(file.data, "country") 
    me.comps.push(me.country)
    return me
  }

  var state = function(file) {
    var me = country(file)
    me.level = "state"
    me.state = long_name(file.data, "administrative_area_level_1")
    me.comps.push(me.state) 
    return me 
  }

  var city = function(file) {
    var me = state(file) 
    me.level = "city"
    me.city = long_name(file.data, "administrative_area_level_2")
    me.comps.push(me.city)
    return me
  }

  var neighbourhood = function(file) {
    var me = city(file)
    me.level = "neighbourhood"
    me.neighbourhood = long_name(file.data, "sublocality")
    me.comps.push(me.neighbourhood)
    return me 
  }

  var route = function(file) {
    var me = neighbourhood(file)
    me.level = "route"
    me.route = long_name(file.data, "route")
    me.comps.push(me.route)
    return me 
  }

  var street_number = function(file) {
    var me = route(file)
    me.level = "street_number"
    me.street_number = long_name(file.data, "street_number")
    me.comps.push(me.street_number)
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
    var doc = converters[file.filename.split(">").length](file)
    doc.id = slug.id(doc.comps)
    delete doc.comps
    return doc
  }

  return {
    convert: convert
  }
}
