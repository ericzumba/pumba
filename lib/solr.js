module.exports = function(options) {
  var solr = require('solr-client');
  var client = solr.createClient({
    host: options.host,
    port: options.port,
    core: options.core 
  })

  var search  = function(query, onSuccess) {
    client.search(query, function(err, obj) {
      if(err != null)
        console.err(err)
      else
        onSuccess(obj)
    })
  }

  return {
    search: search  
  }
} 
