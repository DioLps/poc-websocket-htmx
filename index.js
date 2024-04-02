const express = require("express");
const webserver = express()
  .use(express.static('./public'))
  .listen(3000, () => console.log(`Listening on ${3000}`));
const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });

const container = (child, attr) => `<div ${attr}>${child}</div>`;
const message = (chat_message) =>
  container(
    `<p id="message"><small>${'You'} said: </small>${chat_message}</p>`,
    'hx-swap-oob="beforeend:#chat_room"'
  );

sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send("Server: Connection established");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData);
    sockserver.clients.forEach((client) => {
      const chat_message = data.chat_message;
      console.log(`Client message: ${chat_message}`);
      client.send(message(chat_message));
      if (chat_message == "Hey") {
        setTimeout(() => {
          
        client.send(
          container(
            `<p id="message"><small>Server said: </small> Ho, let's go! </p>`,
            'hx-swap-oob="beforeend:#chat_room"'
          )
        );
        }, 500);
      }
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});
