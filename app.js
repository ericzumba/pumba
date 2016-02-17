var solr = require('./lib/solr')({
  host: "localhost",
  port: 8983,
  core: "loqs"
})

var files = require('./lib/files')({
  path: "dump"
})

var slug = require('./lib/slug')()

var gts = require('./lib/google-to-solr')()

files.each(files.read(function(file) {
  var doc = gts.convert(file)
  doc.id = slug.id(doc.comps)
  delete doc.comps
  solr.add(doc, console.log)
}))
