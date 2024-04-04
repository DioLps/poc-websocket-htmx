const express = require("express");
const webserver = express()
  .use(express.static("./public"))
  .listen(3000, () => console.log(`Listening on ${3000}`));
const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });

const container = (child, attr) => `<div ${attr}>${child}</div>`;
const message = (chat_message, id) =>
  container(
    `<a href="./message.html?id=${id}"><p id="message"><small>${"You"} said: </small>${chat_message}</p></a>`,
    'hx-swap-oob="beforeend:#chat_room"'
  );

const allMessages = [];
sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  // if (condition) {
  //   // ws.send("allMessages")
  // }
  ws.send("Server: Connection established");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData);
    if (data.HEADERS["HX-Trigger"] === "message-page-load") {
      const sourceUrl = new URL(data.HEADERS["HX-Current-URL"]);
      const id = Number(sourceUrl.searchParams.get("id"));
      console.log("allMessages", allMessages);
      const clientMessage = allMessages.find((msg) => msg.id === id);
      if (clientMessage) {
        ws.send(`You said: ${clientMessage.chat_message}`);
      } else {
        ws.send(`404`);
      }
      return;
    }

    console.log("fudeu");

    // sockserver.clients.forEach((client) => {
    // });
    const chat_message = data.chat_message;
    const id = allMessages.length + 1;
    allMessages.push({
      id,
      chat_message,
    });
    console.log(`Client message: ${chat_message}, id: ${id}`);
    ws.send(message(chat_message, id));

    if (chat_message == "Hey") {
      setTimeout(() => {
        ws.send(
          container(
            `<p id="message"><small>Server said: </small> Ho, let's go! </p>`,
            'hx-swap-oob="beforeend:#chat_room"'
          )
        );
      }, 500);
    }
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});
