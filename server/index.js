const WebSocketServer = require('ws').Server;
const adminS = new WebSocketServer({ port: 8081 });
const clientS = new WebSocketServer({ port: 8080 });

let client = { send: () => console.log("no client connected") };

adminS.on("connection", ws => {
  console.log("admin connected");
  ws.on("message", message => {
    client.send(message);
  });
});

clientS.on("connection", ws => {
  console.log("client connected");
  client = ws;
});
