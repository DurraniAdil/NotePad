const input = document.getElementById("inputText");
const wordCount = document.querySelector("[data-word-count]");
const characterCount = document.querySelector("[data-character-count]");
const sentenceCount = document.querySelector("[data-sentence-count]");
const paragraphCount = document.querySelector("[data-paragraph-count]");
const deleteAllButton = document.getElementById("deleteAll");
const saveNotesButton = document.getElementById("saveNotes");
const copyClipboardButton = document.getElementById("copyClipboard");
const toggleThemeButton = document.getElementById("toggleTheme");
const editableTitle = document.getElementById("editableTitle");

// Update analysis when input changes
input.addEventListener("input", updateAnalysis);

// Button event listeners
deleteAllButton.addEventListener("click", deleteAll);
saveNotesButton.addEventListener("click", saveNotes);
copyClipboardButton.addEventListener("click", copyToClipboard);
toggleThemeButton.addEventListener("click", toggleTheme);

// Load saved notes and title from local storage
window.addEventListener("DOMContentLoaded", loadSavedData);

// Update editable title changes
editableTitle.addEventListener("input", saveTitle);

function updateAnalysis() {
  const text = input.value.trim();

  // Count Words
  const wordsArray = text.split(/\s+/).filter(word => word !== "");
  wordCount.innerText = wordsArray.length;

  // Count Characters
  characterCount.innerText = text.length;

  // Count Sentences
  const sentencesArray = text.split(/[.!?]+/).filter(sentence => sentence !== "");
  sentenceCount.innerText = sentencesArray.length;

  // Count Paragraphs
  const paragraphsArray = text.split("\n").filter(paragraph => paragraph.trim() !== "");
  paragraphCount.innerText = paragraphsArray.length;
}

function deleteAll() {
  input.value = ""; // Clear the text area
  editableTitle.textContent = ""; // Clear the editable title
  localStorage.removeItem("savedNotes"); // Remove saved notes
  localStorage.removeItem("savedTitle"); // Remove saved title
  updateAnalysis(); // Update analysis after clearing
}

function saveNotes() {
  const textToSave = input.value;
  localStorage.setItem("savedNotes", textToSave);
  alert("Notes saved successfully!");
}

function copyToClipboard() {
  input.select(); // Select the text area content
  document.execCommand("copy"); // Copy the selected text to clipboard
  alert("Text copied to clipboard!");
}

function toggleTheme() {
  document.body.classList.toggle("night-mode"); // Toggle night mode class
}

function loadSavedData() {
  const savedNotes = localStorage.getItem("savedNotes");
  const savedTitle = localStorage.getItem("savedTitle");

  if (savedNotes) {
    input.value = savedNotes;
    updateAnalysis(); // Update analysis after loading saved notes
  }

  if (savedTitle) {
    editableTitle.textContent = savedTitle;
  }
}

function saveTitle() {
  const titleToSave = editableTitle.textContent.trim();
  localStorage.setItem("savedTitle", titleToSave);
}
