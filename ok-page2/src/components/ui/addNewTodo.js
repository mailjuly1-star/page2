import { showError } from "../../utils/helpers.js";
import { addTodo } from "../../API/index.js";
import { loadData } from "../index.js";

export async function addNewTodo(taskInput) {
  const newTodoText = taskInput.value.trim();

  if (!newTodoText) {
    alert("Add task text");
    return;
  }

  const newTodo = {
    text: newTodoText,
    createdAt: Date.now(),
    completed: false,
  };

  try {
    await addTodo(newTodo);

    console.log("task added");
    taskInput.value = "";
    await loadData();
  } catch (error) {
    console.error(error.message);
    showError("Can not add the task ");
  }
}
