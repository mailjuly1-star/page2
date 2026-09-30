import { updateTask } from "../../index.js";
export function createUpdateButton(todo) {
  const updateButton = document.createElement("button");
  updateButton.classList.add("button-function");

  const updateIcon = document.createElement("img");
  updateIcon.src = "assets/img/icon-update.png";
  updateIcon.alt = "Update";
  updateIcon.title = "Update";
  updateButton.append(updateIcon);
  updateIcon.width = 24;

  updateButton.addEventListener("click", () => updateTask(todo));
  return updateButton;
}
