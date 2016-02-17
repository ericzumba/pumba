var solr = require('./lib/solr')({
  host: "localhost",
  port: 8983,
  core: "loqs"
})

var files = require('./lib/files')({
  path: "dump"
})

var gts = require('./lib/google-to-solr')()

solr.deleteAll()

files.each(files.read(function(file) {
  solr.add(gts.convert(file), console.log)
}))
