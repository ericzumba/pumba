require('./lib/env')('prod', function(env){
  var solr = require('./lib/solr')(env.solr)
  var files = require('./lib/files')(env.files)

  var slug = require('./lib/slug')()
  var gts = require('./lib/google-to-solr')()

  files.each(files.read(function(file) {
    var doc = gts.convert(file)
    doc.id = slug.id(doc.comps)
    delete doc.comps
    solr.add(doc, console.log)
  }))
})
