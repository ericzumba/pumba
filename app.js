var solr = require('./lib/solr')({
  host: "localhost",
  port: 8983,
  core: "loqs"
})

var files = require('./lib/files')({
  dir: "dump"
})
solr.search('q=*:*', console.log)
