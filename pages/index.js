import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleTodoCheckboxChange(completed) {
  if (completed) {
    todoCounter.updateCompleted(true);
  } else {
    todoCounter.updateCompleted(false);
  }
}

function handleTodoDeletion(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleTodoCheckboxChange, handleTodoDeletion);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const el = generateTodo(item);
    section.addItem(el);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const addTodoPopupInstance = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
  
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  
    const id = uuidv4();
    const values = { name, date, id };

    const todoElement = generateTodo(values);
    section.addItem(todoElement);
    addTodoFormValidator.resetValidation();
    todoCounter.updateTotal(true);
    addTodoForm.reset();
    addTodoPopupInstance.close();
  },
});

addTodoPopupInstance.setEventListeners();


addTodoButton.addEventListener("click", () => {
addTodoPopupInstance.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopupInstance.close();
});