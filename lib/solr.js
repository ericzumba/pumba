module.exports = function(options) {
  var solr = require('solr-client');

  var client = solr.createClient({
    host: options.host,
    port: options.port,
    core: options.core 
  })

  client.autoCommit = true;

  var search  = function(query, onSuccess) {
    client.search(query, function(err, obj) {
      if(err)
        console.log(err)
      else
        onSuccess(obj)
    })
  }

  var add = function(docs, onSuccess) {
    client.add(docs, function(err, obj) {
      if(err)
        console.log(err)
      else
        onSuccess(obj)
    })
  }

  var deleteAll = function() {
    client.delete('id','*',function(err,obj){
      if(err)
        console.log(err)
      else
        console.log(obj)
    })

    client.commit({
      waitSearcher: true
    })
  }

  return {
    add: add,
    deleteAll: deleteAll,
    search: search
  }
} 
