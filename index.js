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
    client = ws
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.on('close', () => {
        client = null
    })
});

app.put('/sensors', function (req, res) {
    const sensors = req.body
    if (client) client.send(
        JSON.stringify([
            sensors.left, sensors.front, sensors.right
        ])
    )
    res.sendStatus(200)
})

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});


