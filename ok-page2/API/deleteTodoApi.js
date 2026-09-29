import { host } from "../script.js";

export async function deleteTodo(id) {
  try {
    const response = await fetch(`${host}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Can not delete the task. Status: ${response.status}`);
    }

    console.log("task deleted");
    return true;
  } catch (error) {
    console.error(`Delete error:`, error.message);
    throw error;
  }
}
