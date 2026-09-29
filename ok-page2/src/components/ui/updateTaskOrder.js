import { updateTasksOrderOnServer } from "../../API/index.js";
import { showError, hideLoader, showLoader } from "../../utils/helpers.js";

export async function updateTaskOrder(todosContainer) {
  const todos = [...todosContainer.querySelectorAll(".todo")];
  const updatedOrder = todos.map((todo, index) => {
    return {
      id: todo.getAttribute("data-id"),
      order: index + 1,
    };
  });

  try {
    showLoader();
    for (const task of updatedOrder) {
      await updateTasksOrderOnServer(task.id, task.order);
    }

    console.log("task order updated");
    return true;
  } catch (error) {
    console.error(error.message);
    showError("Can not move the task ");
  } finally {
    hideLoader();
  }
}
