import {
  getTodos,
  toggleTodoStatus,
  deleteTodo,
  updateTodo,
  addTodo,
  deleteCompletedTodos,
} from "./API/index.js";

import { showError, showLoader, hideLoader } from "./utils/helpers.js";
import { initDragAndDrop } from "./components/inits/initDragAndDrop.js";

// Form start

const form = document.getElementById("myForm");
const dataInputs = form.querySelectorAll("input, select");
const yearSelect = form.querySelector("#year");
const passwordInput = form.querySelector("#password");
const repeatPasswordInput = form.querySelector("#repeatPassword");
const passwordErrorMessage = form.querySelector("#passwordError");
const confirmErrorMessage = form.querySelector("#confirm-password");
const requiredFieldsMessage = form.querySelector("#requiredFieldsMessage");
const successMessage = form.querySelector("#successMessage");
let validatePassword = false;
let passwordEqual = false;

const currentYear = new Date().getFullYear();

for (let year = currentYear; year > currentYear - 40; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.append(option);
}

dataInputs.forEach((dataInput, index) => {
  dataInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = (index + 1) % dataInputs.length;
      dataInputs[nextIndex].focus();
    }
  });
});

passwordInput.addEventListener("input", checkPasswordValidity);

function checkPasswordValidity() {
  checkPasswordMatch();
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(passwordInput.value)) {
    passwordErrorMessage.style.display = "block";
    validatePassword = false;
  } else {
    passwordErrorMessage.style.display = "none";
    validatePassword = true;
  }
}

repeatPasswordInput.addEventListener("input", checkPasswordMatch);

function checkPasswordMatch() {
  if (repeatPasswordInput.value !== passwordInput.value) {
    confirmErrorMessage.style.display = "block";
    repeatPasswordInput.style.color = "red";
    passwordEqual = false;
  } else {
    confirmErrorMessage.style.display = "none";
    repeatPasswordInput.style.color = "green";
    passwordEqual = true;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const allFieldsFilled = Array.from(dataInputs).every((dataInput) =>
    dataInput.value.trim(),
  );

  if (!allFieldsFilled || !passwordEqual || !validatePassword) {
    requiredFieldsMessage.style.display = "block";
    return;
  } else {
    requiredFieldsMessage.style.display = "none";
    const formData = new FormData(form);

    const formObj = {};

    formData.forEach((value, key) => {
      // ключи берутся из index.html form
      formObj[key] = value;
    });

    form.reset();
    console.log(JSON.stringify(formObj, null, 2));
    successMessage.style.display = "block";
  }
});
// Form end

// Worker data start
const people = [
  {
    name: "Михаил",
    age: 27,
    isMarried: true,
    hasCar: false,
  },
  {
    name: "Анна",
    age: 29,
    isMarried: true,
    hasCar: true,
  },
  {
    name: "Сергей",
    age: 33,
    isMarried: false,
    hasCar: false,
  },
  {
    name: "Елена",
    age: 26,
    isMarried: false,
    hasCar: true,
  },
];

const listElement = document.getElementById("list");
const moreInfo = document.querySelector(".know-more");

const renderPeople = () => {
  const peopleHtml = people
    .map((person, index) => {
      return `
		<li class="person">
		<p> Name: ${person.name}</p>
		<button
		data-age="${person.age}"
		data-status="${person.isMarried}"
		data-has-car="${person.hasCar}"
		data-position="${index + 1}"
		>Learn more</button>
		</li>`;
    })
    .join("");
  listElement.innerHTML = peopleHtml;
};

renderPeople();

const dataPeople = listElement.querySelectorAll("button");

dataPeople.forEach((dataPerson) => {
  dataPerson.addEventListener("click", () => {
    const age = dataPerson.dataset.age;
    const status = dataPerson.dataset.status === "true";
    const car = dataPerson.dataset.hasCar === "true";
    const position = dataPerson.dataset.position;

    moreInfo.innerHTML = "";

    moreInfo.insertAdjacentHTML(
      "beforeend",
      `<p>Place in the List: ${position}</p>
		<p>Age: ${age}</p>
		<p>is Married: ${status ? "Yes" : "No"}</p>
		<p>has car: ${car ? "Yes" : "No"}</p>
		<button id="close">Close</button>`,
    );

    moreInfo.style.display = "block";

    document.getElementById("close").addEventListener("click", () => {
      moreInfo.innerHTML = "";

      moreInfo.style.display = "none";
    });
  });
});

// Worker data end

// Modal window start
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";

  setTimeout(() => {
    closeModalBtn.style.visibility = "visible";
  }, 0);
});

closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
}

function detachModalEvents() {
  closeModalBtn.removeEventListener("click", closeModal);
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    detachModalEvents();
  }
});
// Modal window end

// Local storage start

document.addEventListener("DOMContentLoaded", loadTodos);

function loadTodos() {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
  };
  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  let tasks = loadTasks();

  const renderTasks = () => {
    const tasksHtml = tasks
      .map((task) => {
        return `
	 <li class="task">
            <input type="checkbox" ${task.completed ? "checked" : ""}/>
            <span>${task.text}</span>
            <button class="deleteButton">Удалить</button>
            </li>	`;
      })
      .join("");
    taskList.innerHTML = tasksHtml;

    taskList.querySelectorAll(".deleteButton").forEach((button, index) => {
      button.addEventListener("click", () => {
        //   tasks = tasks.filter((t) => t.id !== tasks[index].id);
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
      });
    });

    taskList
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox, index) => {
        checkbox.addEventListener("change", (event) => {
          tasks[index].completed = event.target.checked;
          saveTasks(tasks);
          renderTasks();
        });
      });
  };

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks(tasks);
      renderTasks();
      taskInput.value = "";
    }
  });
  renderTasks();
}

// Local storage end

// Switch theme start
const themeSwitch = document.getElementById("themeSwitch");
let userHasChosenTheme = false;

themeSwitch.addEventListener("change", toggleTheme);

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  userHasChosenTheme = true;
  setTheme(newTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (userHasChosenTheme) {
    localStorage.setItem("theme", theme);
  }
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  setTheme(savedTheme);
} else {
  const themeByBrowser = getThemeByBrowserSettings();
  if (themeByBrowser === "dark") {
    setTheme("dark");
  } else {
    const themeByTime = getThemeByTime();
    setTheme(themeByTime);
  }
}

function getThemeByTime() {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 7 && hours < 22 ? "light" : "dark";
}

function getThemeByBrowserSettings() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-theme:dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
}

// Switch theme end
// Audio player start
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const volumeIcons = document.querySelectorAll(".volume img");
const playlistEl = document.getElementById("playlist");
let currentTrackIndex = 0;

const tracks = [
  {
    name: "Return To Innocence / Enigma",
    src: "tracks/fassounds-escape-your-love-upbeat-fashion-pop-dance-412230.mp3",
  },
  {
    name: "Living On My Own / Queen, Freddie Mercury",
    src: "tracks/grand_project-wonders-of-the-earth-550792.mp3",
  },
  {
    name: " Nothing Else Matter / Metallica",
    src: "tracks/sigmamusicart-no-copyright-music-537751.mp3",
  },
  {
    name: "The Sound Of Silence / Simon & Garfunkel; ",
    src: "tracks/track4.mp3",
  },
  {
    name: "A Neverending Dream / X-Perience",
    src: "tracks/sigmamusicart-no-copyright-music-537751.mp3",
  },
];

function setPlayList() {
  playlistEl.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.addEventListener("click", () => {
      loadTrack(index);
      playTrack();
    });
    if (index === currentTrackIndex) {
      li.classList.add("active");
    }
    playlistEl.append(li);
  });
}

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  audio.load();

  currentTrackIndex = index;
  setPlayList();
}

function playTrack() {
  audio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

function pauseTrack() {
  audio.pause();
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}
function stopTrack() {
  audio.pause();
  audio.currentTime = 0;
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function updateProgressBar() {
  const { currentTime, duration } = audio;
  if (isNaN(duration)) return;
  if (!duration || duration === Infinity) return;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function seekTrack() {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
}

function updateVolume(volume) {
  audio.volume = volume;
  volumeIcons.forEach((icon, index) => {
    if (volume < 0.01) {
      icon.style.display = index === 0 ? "inline" : "none";
    } else {
      const iconIndexToShow = Math.min(Math.floor(volume * 3), 2);
      icon.style.display = index === iconIndexToShow + 1 ? "inline" : "none";
    }
  });
}

audio.addEventListener("ended", nextTrack);
audio.addEventListener("timeupdate", updateProgressBar);
playBtn.addEventListener("click", playTrack);
pauseBtn.addEventListener("click", pauseTrack);
stopBtn.addEventListener("click", stopTrack);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);
progressBar.addEventListener("input", seekTrack);
volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value;
  updateVolume(volume);
});

loadTrack(currentTrackIndex);
setPlayList();
updateVolume(volumeSlider.value);

// Audio player end
// Drag and drop start
const dropArea = document.getElementById("drop");
const dragElement = document.getElementById("drag");
const dragImg = document.getElementById("drag-img");

dragElement.addEventListener("dragstart", dragStartHandler);
dragImg.addEventListener("dragstart", dragStartHandler);

function dragStartHandler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  dragElement.classList.add("dragging");
  dragImg.classList.add("dragging");
}

dragElement.addEventListener("dragend", dragEndHandler);

function dragEndHandler() {
  dragElement.classList.remove("dragging");
}

dropArea.addEventListener("dragenter", dragEnterHandler);

function dragEnterHandler(event) {
  event.preventDefault();
  dropArea.classList.add("dragover");
}

dropArea.addEventListener("dragleave", dragLeaveHandler);

function dragLeaveHandler(event) {
  event.preventDefault();
  dropArea.classList.remove("dragover");
}

dropArea.addEventListener("dragover", dragOverHandler);

function dragOverHandler(event) {
  event.preventDefault();
}

dropArea.addEventListener("drop", dropHandler);

function dropHandler(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  console.log(id);
  dragElement.style.backgroundColor = "lightpink";
  dropArea.append(dragElement);
}

// Drag and drop end
// Drag and drop example start

const dragItems = document.querySelectorAll(".answers div");
// Drag and drop example end
dragItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

const dropZones = document.querySelectorAll(".drop-zone");
dropZones.forEach((zone) => {
  zone.addEventListener("dragover", dragOver);
  zone.addEventListener("drop", drop);
});

function dragOver(event) {
  event.preventDefault();
}

// Функция, вызываемая при сбросе элемента
function drop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  const dragItem = document.getElementById(id);
  event.target.append(dragItem);
}
document.getElementById("check-answers").addEventListener("click", () => {
  const correctAnswers = {
    "drop-zone-1": "drag-item-1", // Вопрос 1: ===
    "drop-zone-2": "drag-item-2", // Вопрос 2: NaN
  };

  let score = 0;
  dropZones.forEach((zone) => {
    // это коллекция всех элементов с классом drop-zone (зоны для сброса ответов).
    const zoneId = zone.id; // Получаем уникальный идентификатор текущей зоны сброса. Например, если текущая зона имеет id="drop-zone-1", то zoneId будет равен "drop-zone-1".
    const droppedItem = zone.querySelector('[id^="drag-item-"]'); // Ищем внутри текущей зоны сброса элемент с "drag-item-" (это элемент, который был сброшен в зону).
    console.log(zoneId);
    console.log(droppedItem.id);
    console.log(correctAnswers[zoneId]);
    if (droppedItem && droppedItem.id === correctAnswers[zoneId]) {
      // Проверяем, есть ли в зоне сброса элемент (droppedItem не равен null). Сравниваем id сброшенного элемента (droppedItem.id) с правильным ответом для текущей зоны (correctAnswers[zoneId]).

      score++;
    }
  });

  const resultText =
    score === 2 ? "Все ответы верные!" : `Правильных ответов: ${score}`;
  document.getElementById("result").textContent = resultText;
});
// Loader

const loaderBtn = document.getElementById("loaderBtn");
const imageContainer = document.getElementById("imageContainer");
const loaderImg = document.getElementById("loaderImg");

loaderBtn.addEventListener("click", fn);

function fn() {
  // Показываем лоадер перед началом загрузки
  loaderImg.style.display = "block";

  // Функция для загрузки изображения
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image(); // Создаем новый объект изображения

      // Обработчик загрузки изображения
      image.onload = () => {
        resolve(image); // Изображение успешно загружено
      };

      // Обработчик ошибки загрузки
      image.onerror = () => {
        reject(new Error(`Не удалось загрузить изображение`));
      };

      // Устанавливаем URL изображения
      image.src = url;
    });
  }

  // Загружаем изображение
  loadImage("https://kot-prikol.ru/uploads/posts/2024-11/1732874017_1.jpg")
    .then((image) => {
      console.log("Изображение загружено");
      imageContainer.append(image); // Добавляем изображение в контейнер
    })
    .catch((error) => {
      console.error("Ошибка:", error.message);
    })
    .finally(() => {
      console.log("Запрос завершен");
      loaderImg.style.display = "none"; // Скрываем лоадер после завершения
    });
}

// Fetch

const loaderFetch = document.getElementById("loaderFetch");

async function fetchData(url, errorMessage) {
  try {
    loaderFetch.style.display = "block";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Данные не получены. Статус: ${response.status}`);
    }

    const data = await response.json();

    console.log("Данные получены:", data);
    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      console.error("Ошибка: Нет подключения к интернету.");
    } else {
      console.error(`${errorMessage}`, error.message);
    }
    throw error;
  } finally {
    loaderFetch.style.display = "none";
  }
}

async function getPosts() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const errorMessage = "Ошибка при получении постов";
  const result = await fetchData(url, errorMessage);
  return result;
}

async function getUsers() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const errorMessage = "Ошибка при получении пользователей";
  const result = await fetchData(url, errorMessage);
  return result;
}

async function getComments() {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const errorMessage = "Ошибка при получении комментариев";
  const result = await fetchData(url, errorMessage);
  return result;
}

async function getData() {
  try {
    const [postsResult, usersResult, commentsResult] = await Promise.allSettled(
      [getPosts(), getUsers(), getComments()],
    );

    const posts = postsResult.status === "fulfilled" ? postsResult.value : [];
    const users = usersResult.status === "fulfilled" ? usersResult.value : [];
    const comments =
      commentsResult.status === "fulfilled" ? commentsResult.value : [];

    console.log("posts", postsResult);
    console.log("users", usersResult);
    console.log("comments", commentsResult);

    const container = document.getElementById("posts-container");

    // Очищаем контейнер перед добавлением новых данных
    container.innerHTML = "";

    if (posts.length === 0) {
      container.innerHTML = "<p>Нет доступных постов</p>";
      return;
    }
    // Создаем HTML-элемент для каждого поста
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // Заголовок поста
      const titleElement = document.createElement("h2");
      titleElement.textContent = post.title;

      // Текст поста
      const bodyElement = document.createElement("p");
      bodyElement.textContent = post.body;

      // Добавляем заголовок и текст в элемент поста
      postElement.append(titleElement);
      postElement.append(bodyElement);

      if (users.length > 0) {
        const user = users.find((user) => user.id === post.userId);

        const userElement = document.createElement("div");
        const nameElement = document.createElement("p");
        nameElement.textContent = `Author: ${user.name}`;

        const emailElement = document.createElement("p");
        emailElement.textContent = `Email: ${user.email}`;

        const websiteElement = document.createElement("p");
        websiteElement.textContent = `Website: ${user.website}`;

        userElement.append(nameElement);
        userElement.append(emailElement);
        userElement.append(websiteElement);

        postElement.append(userElement);
      }

      if (comments.length > 0) {
        const postComments = comments.filter(
          (comment) => comment.postId === post.id,
        );
        if (postComments.length > 0) {
          const commentsContainer = document.createElement("div");
          commentsContainer.classList.add("comments");

          const commentsTitle = document.createElement("h3");
          commentsTitle.textContent = "Comments";
          commentsContainer.append(commentsTitle);

          postComments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            const commentName = document.createElement("p");
            commentName.textContent = `Name: ${comment.name}`;

            const commentEmail = document.createElement("p");
            commentEmail.textContent = `Email: ${comment.email}`;

            const commentBody = document.createElement("p");
            commentBody.textContent = comment.body;

            commentElement.append(commentName);
            commentElement.append(commentEmail);
            commentElement.append(commentBody);

            commentsContainer.append(commentElement);
          });

          postElement.append(commentsContainer);
          console.log(postElement);
        }
      }

      // Добавляем пост в контейнер
      container.append(postElement);
    });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

const buttonFetch = document.getElementById("buttonFetch");
buttonFetch.addEventListener("click", getData);

// Todo
export const todosContainer = document.getElementById("todos-container");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const downloadButton = document.getElementById("todo-button");

const deleteCompletedButton = document.getElementById(
  "delete-completed-button",
);

async function loadData() {
  try {
    showLoader();
    const todos = await getTodos();
    renderTodo(todos);
  } catch (error) {
    console.error(error.message);

    if (error.message === "No tasks") {
      showError("No tasks");
    } else {
      showError("Con not receive tasks");
    }
  } finally {
    hideLoader();
  }
}

function renderTodo(todos) {
  todosContainer.innerHTML = "";
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  deleteCompletedButton.style.display = hasCompletedTodos ? "block" : "none";

  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.setAttribute("data-id", todo.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", async () => {
      try {
        await toggleTodoStatus(todo.id, checkbox.checked);
        await loadData();
      } catch (error) {
        console.error(error.message);
        showError("Can not change task status");
      }
    });

    const textElement = document.createElement("p");
    textElement.textContent = todo.text;
    textElement.style.textDecoration = todo.completed ? "line-through" : "none";

    const timeElement = document.createElement("p");
    timeElement.textContent = new Date(todo.createdAt).toLocaleString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button-function");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/img/icon-delete.png";
    deleteIcon.alt = "Delete";
    deleteIcon.title = "Delete"; //появляется при наведении
    deleteButton.append(deleteIcon);

    deleteButton.addEventListener("click", async () => {
      try {
        await deleteTodo(todo.id);
        await loadData();
      } catch (error) {
        console.error(error.message);
        showError("Can not delete the task ");
      }
    });

    const updateButton = document.createElement("button");
    updateButton.classList.add("button-function");

    const updateIcon = document.createElement("img");
    updateIcon.src = "assets/img/icon-update.png";
    updateIcon.alt = "Update";
    updateIcon.title = "Update";
    updateButton.append(updateIcon);

    updateButton.addEventListener("click", async () => {
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
    });

    todoElement.append(
      checkbox,
      textElement,
      timeElement,
      deleteButton,
      updateButton,
    );

    initDragAndDrop(todoElement, todo, todosContainer);

    todosContainer.append(todoElement);
    downloadButton.hidden = true;
    hideLoader();
  });
}

async function addNewTodo() {
  const newTodoText = taskInput.value.trim();

  if (!newTodoText) {
    alert("Add task text");
    return;
  }

  const newTodo = {
    text: newTodoText,
    createdAt: Date.now(),
    completed: false,
  };

  try {
    await addTodo(newTodo);

    console.log("task added");
    taskInput.value = "";
    await loadData();
  } catch (error) {
    console.error(error.message);
    showError("Can not add the task ");
  }
}

addButton.addEventListener("click", addNewTodo);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewTodo();
  }
});
downloadButton.addEventListener("click", loadData);

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
