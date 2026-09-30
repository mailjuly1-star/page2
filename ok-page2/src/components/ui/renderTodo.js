import { createCheckbox } from "./createElements/createCheckbox.js";
import {
  initChangeStatus,
  initDragAndDrop,
  initDelete,
  downloadButton,
  updateTask,
} from "../index.js";

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
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.setAttribute("data-id", todo.id);

    const checkbox = createCheckbox(todo);

    const textElement = document.createElement("p");
    textElement.textContent = todo.text;
    textElement.style.textDecoration = todo.completed ? "line-through" : "none";

    const timeElement = document.createElement("p");
    timeElement.textContent = new Date(todo.createdAt).toLocaleString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button-function");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/img/icon-delete.png";
    deleteIcon.alt = "Delete";
    deleteIcon.title = "Delete"; //появляется при наведении
    deleteButton.append(deleteIcon);
    initDelete(todo, deleteButton);

    const updateButton = document.createElement("button");
    updateButton.classList.add("button-function");

    const updateIcon = document.createElement("img");
    updateIcon.src = "assets/img/icon-update.png";
    updateIcon.alt = "Update";
    updateIcon.title = "Update";
    updateButton.append(updateIcon);

    updateButton.addEventListener("click", () => updateTask(todo));

    todoElement.append(
      checkbox,
      textElement,
      timeElement,
      deleteButton,
      updateButton,
    );

    initDragAndDrop(todoElement, todo, todosContainer);

    todosContainer.append(todoElement);
    downloadButton.hidden = true;
    hideLoader();
  });
}
