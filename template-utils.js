const { loadView } = require("./loader");
const { parseView } = require("./htmlParser");

const createEle = (child, attr, tag = "div") =>
  `<${tag} ${attr}>${child}</${tag}>`;

const container = (child, attr) => createEle(child, attr);
const todosContainer = (
  child = "<span style='margin-left:.5rem' class='md-typescale-body-medium' id='no-items'> No items </span>"
) => container(child, 'hx-swap-oob="innerHTML:#todos-list"');

const renderTodos = async (list) => {
  try {
    const listItemView = await loadView("list-item-todo");
    const todosTemplate = list.reduce((acc, todo) => {
      acc += `
        ${parseView(listItemView, todo)}
      `;
      return acc;
    }, "");
    if (todosTemplate !== "") {
      return todosContainer(todosTemplate);
    }
    return todosContainer();
  } catch (error) {
    console.log("Exception on renderTodos: ", error);
    return todosContainer();
  }
};

const renderTodo = async (todo) => {
  try {
    const listItemView = await loadView("list-item-todo");
    return parseView(listItemView, todo);
  } catch (error) {
    console.log("Exception on renderTodo: ", error);
    return todosContainer();
  }
};

module.exports = {
  createEle,
  container,
  todosContainer,
  renderTodos,
  renderTodo,
};
