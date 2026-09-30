import { loadData } from "../index.js";

export const downloadButton = document.getElementById("todo-button");

export function initDownload() {
  downloadButton.addEventListener("click", loadData);
}
