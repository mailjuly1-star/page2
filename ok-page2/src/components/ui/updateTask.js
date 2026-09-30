import { loadData } from "../index.js";

import { showError } from "../../utils/helpers.js";
import { updateTodo } from "../../API/index.js";

export async function updateTask(todo) {
  const { value: newText } = await Swal.fire({
    title: "Change text",
    input: "text",
    inputLabel: "Add text for new task",
    inputValue: todo.text,
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "field can not be empty";
      }
    },
  });

  if (newText) {
    try {
      await updateTodo(todo.id, newText);
      await loadData();
    } catch (error) {
      showError("Can not update the task");
    }
  }
}
