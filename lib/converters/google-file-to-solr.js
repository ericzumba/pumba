module.exports = function() {
  var slug = require('../slug')()

  var range = function(a, b) {
    var list = []
    while(a <= b) {
      list.push(a)
      a++
    }
    return list
  }

  var long_name = function(data, validName) {
    return data["results"][0]["address_components"].filter(function(comp) {
      return comp["types"].indexOf(validName) > -1
    }).map(function(comp) {
      console.log(comp["long_name"])
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

  var cityComponents = function(doc, json) {
    var locality = long_name(json, "locality") 
    if(locality)
      return locality
    else {
      return range(2, 5).map(function(i) {
        return long_name(json, "administrative_area_level_" + i)
      }).filter(function(c) {
        return c
      }).join(" > ") 
    }
  }

  var city = function(file) {
    var me = state(file) 
    me.level = "city"
    me.city = cityComponents(me, file.data) 
    me.comps.push(me.city)
    return me
  }

  var nbhComponents = function(doc, json) {
    return range(1, 4).map(function(i) {
      return long_name(json, "sublocality_level_" + i)
    }).filter(function(c) {
      return c
    }).join(" > ") 
  }

  var neighbourhood = function(file) {
    var me = city(file)
    me.level = "neighbourhood"
    me.neighbourhood = nbhComponents(me, file.data) 
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
    doc.id = file.filename.replace(".json", "").split(">").join("/") 
    delete doc.comps
    console.log(doc)
    return doc
  }

  return {
    convert: convert
  }
}
