// this is just a mock db!
const userId = 1;
let db = [];

async function _getAllFromThisUser() {
  const baseUrl = "https://jsonplaceholder.typicode.com/";
  // Mocking user id because i'm lazy to do auth here
  const allTodos = await (await fetch(`${baseUrl}/todos`)).json();
  return allTodos.filter((todo) => todo.userId === userId);
}

async function initMemoryDB() {
  try {
    console.log("Initializing DB...");
    db = await _getAllFromThisUser();
    console.log("Okay!");
  } catch (error) {
    console.log("Exception in initMemoryDB: ", error);
  }
}

function list() {
  return JSON.parse(JSON.stringify(db));
}

function getById(id) {
  const todo =  db.find((item) => item.id === Number(id));
  return JSON.parse(JSON.stringify(todo));
}

function create(title) {
  const todo = {
    userId,
    id: db.length + 1,
    completed: false,
    title,
  }
  db.push(todo);
  return JSON.parse(JSON.stringify(todo));
}

function updateById(id, todo) {
  db = db.map((item) => {
    if (item.id === id) {
      item = todo;
    }
    return item;
  });
  return JSON.parse(JSON.stringify(db));
}

function deleteById(id) {
  db = db.filter((item) => item.id !== Number(id));
  return JSON.parse(JSON.stringify(db));
}

module.exports = {
  TODO: {
    initMemoryDB,
    create,
    list,
    getById,
    updateById,
    deleteById,
  },
};
