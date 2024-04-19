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
  return db;
}

function getById(id) {
  return db.find((item) => item.id === Number(id));
}

function create(todo) {
  db.push({
    userId,
    ...todo,
  });
  return db;
}

function updateById(id, todo) {
  db = db.map((item) => {
    if (item.id === id) {
      item = todo;
    }
    return item;
  });
  return db;
}

function deleteById(id) {
  db = db.filter((item) => item.id !== Number(id));
  return db;
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
