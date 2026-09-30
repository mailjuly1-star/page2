import { initDelete } from "../../index.js";

export function createDeleteButton(todo) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button-function");

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "assets/img/icon-delete.png";
  deleteIcon.alt = "Delete";
  deleteIcon.title = "Delete"; //появляется при наведении
  deleteIcon.width = 24;
  deleteButton.append(deleteIcon);
  initDelete(todo, deleteButton);
  return deleteButton;
}
