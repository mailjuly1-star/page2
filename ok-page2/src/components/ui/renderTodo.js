import { createTodoElement } from "./createElements/createTodoElement.js";

import { initDragAndDrop, downloadButton, updateTask } from "../index.js";

import { hideLoader } from "../../utils/helpers.js";

export const todosContainer = document.getElementById("todos-container");

export const deleteCompletedButton = document.getElementById(
  "delete-completed-button",
);

export function renderTodo(todos) {
  todosContainer.innerHTML = "";
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  deleteCompletedButton.style.display = hasCompletedTodos ? "block" : "none";

  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo, todosContainer);
    todosContainer.append(todoElement);
  });

  downloadButton.hidden = true;
  hideLoader();
}
