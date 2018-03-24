const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser')
const WebSocket = require('ws')
app.use(bodyParser.json())
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let client = null
wss.on('connection', function connection(ws, req) {
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    client = ws
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    
});

app.put('/sensors', function (req, res) {
    console.log(req.body)
    if(client) client.send(JSON.stringify(req.body));
    res.sendStatus(200)
})

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});


