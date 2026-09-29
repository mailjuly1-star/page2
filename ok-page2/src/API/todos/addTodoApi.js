import { host } from "../host.js";

export async function addTodo(newTodo) {
  try {
    const response = await fetch(`${host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`Can not add the task. Status: ${response.status}`);
    }

    console.log("task added");
    return await response.json;
  } catch (error) {
    console.error(`Add task error:`, error.message);
    throw error;
  }
}
