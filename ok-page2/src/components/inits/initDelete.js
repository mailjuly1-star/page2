import { loadData } from "../index.js";

import { showError } from "../../utils/helpers.js";
import { deleteTodo } from "../../API/index.js";

export function initDelete(todo, deleteButton) {
  deleteButton.addEventListener("click", async () => {
    try {
      await deleteTodo(todo.id);
      await loadData();
    } catch (error) {
      console.error(error.message);
      showError("Can not delete the task ");
    }
  });
}
