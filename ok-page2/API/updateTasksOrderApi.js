import { host } from "../script.js";
export async function updateTasksOrderOnServer(taskId, order) {
  try {
    const response = await fetch(`${host}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });

    if (!response.ok) {
      throw new Error(
        `Can not update order the task. Status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error(`Order status error:`, error.message);
    throw error;
  }
}
