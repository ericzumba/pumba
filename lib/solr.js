module.exports = function() {
  var solr = require('solr-client');
  var client = solr.createClient({
    host: "localhost",
    port: 8983,
    core: "loqs"
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
