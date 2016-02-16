var solr = require('./lib/solr')({
  host: "localhost",
  port: 8983,
  core: "loqs"
})
solr.search('q=*:*', console.log)
