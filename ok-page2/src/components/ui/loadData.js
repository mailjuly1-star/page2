import { getTodos } from "../../API/index.js";
import { showError, showLoader, hideLoader } from "../../utils/helpers.js";
import { renderTodo } from "../index.js";

export async function loadData() {
  try {
    showLoader();
    const todos = await getTodos();
    renderTodo(todos);
  } catch (error) {
    console.error(error.message);

    if (error.message === "No tasks") {
      showError("No tasks");
    } else {
      showError("Con not receive tasks");
    }
  } finally {
    hideLoader();
  }
}
