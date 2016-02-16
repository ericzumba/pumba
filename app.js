var solr = require('./lib/solr')({
  host: "localhost",
  port: 8983,
  core: "loqs"
})

var files = require('./lib/files')({
  path: "dump"
})

var gts = require('./lib/google-to-solr')()

files.each(files.read(function(file) {
  var doc = gts.convert(file)
  console.log(doc)
}))
