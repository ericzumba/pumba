var solr = require('./lib/solr')()
solr.search('q=*:*', console.log)
