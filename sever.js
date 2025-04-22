// server.js
const WebSocket = require('ws');
const http = require('http');

const PORT = process.env.PORT || 8080;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

const relays = {};

wss.on('connection', function connection(ws, req) {
  const path = req.url;

  if (!path.startsWith("/join/")) {
    ws.close();
    return;
  }

  const room = path.substring("/join/".length);
  console.log(`Connection to room: ${room}`);

  if (!relays[room]) {
    relays[room] = [];
  }

  relays[room].push(ws);

  ws.on('message', function message(data) {
    for (let client of relays[room]) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  });

  ws.on('close', () => {
    relays[room] = relays[room].filter(client => client !== ws);
    if (relays[room].length === 0) {
      delete relays[room];
    }
  });
});

server.listen(PORT, () => {
  console.log(`Relay server running on port ${PORT}`);
});
// server.js
const WebSocket = require('ws');
const http = require('http');

const PORT = process.env.PORT || 8080;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

const relays = {};

wss.on('connection', function connection(ws, req) {
  const path = req.url;

  if (!path.startsWith("/join/")) {
    ws.close();
    return;
  }

  const room = path.substring("/join/".length);
  console.log(`Connection to room: ${room}`);

  if (!relays[room]) {
    relays[room] = [];
  }

  relays[room].push(ws);

  ws.on('message', function message(data) {
    for (let client of relays[room]) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  });

  ws.on('close', () => {
    relays[room] = relays[room].filter(client => client !== ws);
    if (relays[room].length === 0) {
      delete relays[room];
    }
  });
});

server.listen(PORT, () => {
  console.log(`Relay server running on port ${PORT}`);
});
