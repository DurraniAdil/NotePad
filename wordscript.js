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

// This updates analysis when input changes(basically performs a word count)
input.addEventListener("input", updateAnalysis);

// Button event listeners(all the different features are listed here)
deleteAllButton.addEventListener("click", deleteAll);
saveNotesButton.addEventListener("click", saveNotes);
copyClipboardButton.addEventListener("click", copyToClipboard);
toggleThemeButton.addEventListener("click", toggleTheme);

window.addEventListener("DOMContentLoaded", loadSavedData);

editableTitle.addEventListener("input", saveTitle);

function updateAnalysis() {
  const text = input.value.trim();

  // performs a word count
  const wordsArray = text.split(/\s+/).filter(word => word !== "");
  wordCount.innerText = wordsArray.length;

  // counts the characters 
  characterCount.innerText = text.length;

  // count the sentences
  const sentencesArray = text.split(/[.!?]+/).filter(sentence => sentence !== "");
  sentenceCount.innerText = sentencesArray.length;

  // the paragraphs
  const paragraphsArray = text.split("\n").filter(paragraph => paragraph.trim() !== "");
  paragraphCount.innerText = paragraphsArray.length;
}

function deleteAll() {
  input.value = ""; 
  editableTitle.textContent = ""; 
  localStorage.removeItem("savedNotes"); 
  localStorage.removeItem("savedTitle"); 
  updateAnalysis(); 
}

function saveNotes() {
  const textToSave = input.value;
  localStorage.setItem("savedNotes", textToSave);
  alert("Notes saved successfully!");
}

function copyToClipboard() {
  input.select(); 
  document.execCommand("copy"); 
  alert("Text copied to clipboard!");
}

function toggleTheme() {
  document.body.classList.toggle("night-mode"); 
}

function loadSavedData() {
  const savedNotes = localStorage.getItem("savedNotes");
  const savedTitle = localStorage.getItem("savedTitle");

  if (savedNotes) {
    input.value = savedNotes;
    updateAnalysis(); 
  }

  if (savedTitle) {
    editableTitle.textContent = savedTitle;
  }
}

function saveTitle() {
  const titleToSave = editableTitle.textContent.trim();
  localStorage.setItem("savedTitle", titleToSave);
}
