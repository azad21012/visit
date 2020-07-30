const express = require('express');
const redis = require("redis");

const app =express();
const client = redis.createClient({
    host:"192.168.1.33",
    port:6379
});
 

client.set('visits',0)
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
 
client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/',(req,res)=>{
    client.get('visits',(err,result)=>{
        res.send('you visits this site:'+result);
        client.set('visits',parseInt(result)+1)
    })
})

app.listen(8081,()=>console.log('listen to 8081'));