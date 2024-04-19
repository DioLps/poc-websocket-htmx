async function onEdit() {
  const editDialog = document.querySelector(".edit-todo");
  await editDialog?.show();
}

async function onCreate() {
  const createDialog = document.querySelector(".create-todo");
  await createDialog?.show();
}

