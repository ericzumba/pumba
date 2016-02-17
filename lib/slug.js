module.exports = function(){
  var slug = require('slug')

  var toSlug = function(c) {
    return slug(c, '-').toLowerCase()
  }
  var id = function(components) {
    return components.map(toSlug).join('/')
  }

  return {
    id: id
  }
}
