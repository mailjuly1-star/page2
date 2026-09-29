import { host } from "../script.js";

export async function toggleTodoStatus(id, completed) {
  try {
    const response = await fetch(`${host}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error(
        `Can not update status the task. Status: ${response.status}`,
      );
    }

    console.log("task status updated");
    return true;
  } catch (error) {
    console.error(`Update status error:`, error.message);
    throw error;
  }
}
