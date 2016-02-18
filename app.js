require('./lib/env')(process.argv[2], process.argv[3], function(env) {
  var solr = require('./lib/solr')(env.solr)
  var files = require('./lib/files')(env.files)
  var gts = require('./lib/converters/' + env.converter)()

  files.each(files.read(function(file) {
    solr.add(gts.convert(file), console.log)
  }))
})
