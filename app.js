require('./lib/env')(process.argv[2], function(env){
  var solr = require('./lib/solr')(env.solr)
  var files = require('./lib/files')(env.files)
  var gts = require('./lib/google-to-solr')()

  files.each(files.read(function(file) {
    solr.add(gts.convert(file), console.log)
  }))
})
