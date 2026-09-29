import { host } from "../host.js";

export async function deleteCompletedTodos(todosContainer) {
  try {
    const completedTodos = Array.from(
      todosContainer.querySelectorAll(".todo"),
    ).filter((todoElement) => {
      const checkbox = todoElement.querySelector('input[type="checkbox"]');
      return checkbox.checked;
    });

    for (const todoElement of completedTodos) {
      const taskId = todoElement.getAttribute("data-id");

      const deleteResponse = await fetch(`${host}/${taskId}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error(
          `Can not delete completed task. Status: ${deleteResponse.status}`,
        );
      }
    }

    return true;
  } catch (error) {
    console.error("Deleted completed task error:", error.message);
    throw error;
  }
}
