async function onEdit() {
  const editDialog = document.querySelector(".edit-todo");
  await editDialog?.show();
}

async function onCreate() {
  const createDialog = document.querySelector(".create-todo");
  await createDialog?.show();
}

async function onSubmitTodo() {
  try {
    const createDialog = document.querySelector(".create-todo");
    await createDialog?.close();
    const input = document.querySelector("#create-todo-request");
    input.value = "";
  } catch (error) {
    console.log("Exception on onSubmitTodo: ", error);
  }
}
