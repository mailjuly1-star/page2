import { host } from "../host.js";

export async function updateTodo(id, newText) {
  try {
    const response = await fetch(`${host}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    });

    if (!response.ok) {
      throw new Error(`Can not update the task. Status: ${response.status}`);
    }

    console.log("task udated");
    return true;
  } catch (error) {
    console.error(`Update task error:`, error.message);
    throw error;
  }
}
