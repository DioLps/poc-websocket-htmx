const { loadView } = require("./loader");
const { parseView } = require("./htmlParser");

const createEle = (child, attr, tag = "div") =>
  `<${tag} ${attr}>${child}</${tag}>`;

const container = (child, attr) => createEle(child, attr);
const todosContainer = (
  child = "<span class='md-typescale-body-medium'> No items </span>"
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
    return todosContainer(todosTemplate);
  } catch (error) {
    console.log("Exception on renderTodos: ", error);
    return todosContainer();
  }
};

module.exports = {
  createEle,
  container,
  todosContainer,
  renderTodos,
};
