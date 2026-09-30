import { showError } from "../../utils/helpers.js";
import { deleteCompletedTodos } from "../../API/index.js";
import { deleteCompletedButton, loadData, todosContainer } from "../index.js";

export function initDeleteCompleted() {
  deleteCompletedButton.addEventListener("click", async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "All completed tasks will be delited!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteCompletedTodos(todosContainer);
      await loadData();
    } catch (error) {
      console.error(error.message);
      showError("Can not delete task list");
    }
  });
}
