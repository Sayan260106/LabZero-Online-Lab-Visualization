import { WebSocketServer, WebSocket } from "ws";

const PORT = Number(process.env.PORT || 5000);
const wss = new WebSocketServer({ port: PORT });

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.isAlive = true;

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("message", (message) => {
    // Broadcast to everyone except sender
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

setInterval(() => {
  for (const client of clients) {
    if (!client.isAlive) {
      clients.delete(client);
      client.terminate();
      continue;
    }

    client.isAlive = false;
    client.ping();
  }
}, 30000);

console.log(`Signaling server running on ws://0.0.0.0:${PORT}`);
