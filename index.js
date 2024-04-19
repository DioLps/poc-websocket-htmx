const express = require("express");

express()
  .use(express.static("./public"))
  .listen(3000, () => console.log(`Listening on http://localhost:${3000}`));

const DB = require("./db");

DB.TODO.initMemoryDB().then(() => {
  const { WebSocketServer } = require("ws");
  const sockserver = new WebSocketServer({ port: 443 });

  const { parseAndLoad } = require("./htmlParser");
  const { container, renderTodos, renderTodo } = require("./template-utils");

  sockserver.on("connection", (ws) => {
    console.log("New client connected!");
    ws.send("Server: Connection established");
    ws.on("close", () => console.log("Client has disconnected!"));

    ws.on("message", async (rawData) => {
      const data = JSON.parse(rawData);

      // console.log("data", data);

      switch (data.HEADERS["HX-Trigger"]) {
        case "load-todos":
          const list = DB.TODO.list();
          const todos = await renderTodos(list);
          return ws.send(todos);
        case "toggle-todo-request":
          try {
            const formId = data.HEADERS["HX-Trigger-Name"];
            const todo = DB.TODO.getById(formId);
            todo.completed = !todo.completed;
            const res = DB.TODO.updateById(todo.id, todo);
            console.log("updated id: ", formId);
            console.log("res: ", res);
            return;
          } catch (error) {
            console.log("error - >", error);
            return;
          }
        case "create-todo-request":
          try {
            if (data.title === "") {
              return;
            }
            const list = DB.TODO.list();

            const title = data.title;
            const todo = DB.TODO.create(title);
            const response = await renderTodo(todo);

            let attr = 'hx-swap-oob="afterend:#todos-list"';

            if (list.length === 0) {
              attr = 'hx-swap-oob="innerHTML:#todos-list"';
            }

            return ws.send(container(response, attr));
          } catch (error) {
            console.log("error - >", error);
            return;
          }
        case "delete-todo-request":
          try {
            const formId = data.HEADERS["HX-Trigger-Name"];
            const res = DB.TODO.deleteById(formId);
            const todos = await renderTodos(res);
            return ws.send(todos);
          } catch (error) {
            console.log("error - >", error);
            return;
          }
        case "create-todo-dialog-shell":
          const createDialog = await parseAndLoad("create-todo");
          return ws.send(
            container(
              createDialog,
              'hx-swap-oob="innerHTML:#create-todo-dialog-shell"'
            )
          );
        default:
          console.log("Received not authorized message", data);
          break;
      }
    });

    ws.onerror = () => console.log("websocket error");
  });
});
