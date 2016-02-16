var solr = require('./lib/solr')({
  host: "localhost",
  port: 8983,
  core: "loqs"
})

var files = require('./lib/files')({
  path: "dump"
})

files.each(files.read)
