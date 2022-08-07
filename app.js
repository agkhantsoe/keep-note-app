// global selectors
const noteContainer = document.querySelector(".note-container");
const modal = document.querySelector("#modal");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const toggleBtn = document.querySelector(".toggle-btn");

let theme = "light";
function toggleTheme() {

  theme === "light" ? (theme = "dark") : (theme = "light");
  loadTheme()
}
function loadTheme(){
  const root = document.querySelector(":root");
  root.setAttribute("color-scheme", theme);
  
}

// Class: for creating a  new  note
class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Math.floor(Math.random() * 2000);
  }
}

// Saving to localStorage
// Function: Retreive notes from local storage
function getNotes() {
  let notes;
  if (localStorage.getItem("keep.notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("keep.notes"));
  }
  return notes;
}
// Function: Add a note to local storage
function saveNotetoLocalStorage(note) {
  let notes = getNotes();
  notes.push(note);
  localStorage.setItem("keep.notes", JSON.stringify(note));
}
// Function: remove a note  from local storage
function removeNote(id) {
  let notes = getNotes();
  notes.forEach((note) => {
    if (note.id === id) {
      notes.splice(index, 1);
    }
  });
  notes = notes.filter((note) => note.id !== id);
  localStorage.setItem("keep.notes", JSON, stringify(notes));
}
// UI UPDATES
// Function: Create new note in UI
function addNotetoList() {
  const newUINote = document.createElement("div");
  newUINote.classList.add("note");
  newUINote.innerHTML = `<div class="note">
        <h2 class="note__title">${Note.title}</h2>
        <p class="note__body">${Note.body}</p>
        <div class="note__btns">
          <button class="note__btn note__view">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="note__btn note__delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
  Note.appendChild(newUINote);
}
// Function: Show notes in UI
function showAllNotes() {
  let notes = getNotes();
  notes.forEach((note) => {});
}
// Function: Show alert message
function showAlertMessage(message, alertClass) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add(`message ${alertClass}`);
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement("beforebegin", alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
}
// Function: View note in modal
function openNoteModal(title, body) {
  const modalTitle = document.querySelector("modal__title");
  const modalBody = document.querySelector("modal__body");
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.showModal();
}
// Event: Close Modal

// Event: Note Buttons
noteContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("note__view")) {
    const currentNote = event.target.closet(".note");
    const title = currentNote.querySelector(".note__title").textContent;
    const body = currentNote.querySelector(".note__body").textContent;
    openNoteModal(title, body);
  }
  if (event.target.classList.contains("note__delete")) {
    //trigger delete
  }
});
//event; display all Notes at app start
window.addEventListener("DOMContentLoaded", () => {
  showAllNotes();
  if (localStorage.getItem("keep.theme")) {
    theme = localStorage.getItem("keep.theme");
  }
  toggleBtn.textContent =
    theme === "light" ? (
      <i class="fa-solid fa-moon"></i>
    ) : (
      <i class="fa-solid fa-sun"></i>
    );
});
// Event: Display Notes
function print() {
  console.log("print");
}
// Event: Note Form Submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const noteInput = document.querySelector("#note");
  if (noteInput.ariaValueMax.length > 0 && titleInput.value.length > 0) {
    const newNote = new Note(titleInput.value, noteInput.value);
    //add note to list
    addNotetoList(newNote);
    //save to localStorage
    //clear form
    titleInput.value = "";
    noteInput.value = "";
    //show alert message
    showAlertMessage("note save successfull", "success-message");
  }
});
