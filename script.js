let content = document.querySelector(".content");

let form = document.querySelector("#newBook");
let dialog = document.querySelector("#dialog");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let noOfPages = document.querySelector("#noOfPages");
let isRead = false; // default value for the checkbox, could change this later

let showDialog = document.querySelector("#showDialog");

let library = JSON.parse(localStorage.getItem("library")) || [];

displayBooks(); // Show books when page loads

showDialog.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Add book with form values
  addBooks(title.value, author.value, noOfPages.value, isRead);

  // Close the form dialog and reset inputs
  dialog.close();
  form.reset();
});

function Book(title, author, noOfPages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.isRead = isRead;
}

function addBooks(title, author, noOfPages, isRead) {
  let newBook = new Book(title, author, noOfPages, isRead);
  library.push(newBook);
  localStorage.setItem("library", JSON.stringify(library));

  displayBooks();
}

function displayBooks() {
  content.innerHTML = ""; // Clear previous books

  library.forEach((book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    let bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("h4");
    bookAuthor.textContent = book.author;

    let pages = document.createElement("p");
    pages.textContent = `Pages: ${book.noOfPages}`;

    // Optional: Add Read Status
    let readStatus = document.createElement("p");
    readStatus.textContent = book.isRead ? "Read" : "Not Read";

    bookCard.append(bookTitle, bookAuthor, pages, readStatus);
    content.appendChild(bookCard);
  });
}
