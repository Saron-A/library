let content = document.querySelector(".content");

let form = document.querySelector("#newBook");
let dialog = document.querySelector("#dialog");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let noOfPages = document.querySelector("#pages");
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

  Object.setPrototypeOf(newBook, Book.prototype);
}

function displayBooks() {
  content.innerHTML = ""; // Clear previous books

  library.forEach((book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    let bookContent = document.createElement("div");
    let bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("h4");
    bookAuthor.textContent = `By: ${book.author}`;

    let pages = document.createElement("p");
    pages.textContent = `Pages: ${book.noOfPages}`;

    // Optional: Add Read Status
    let readStatus = document.createElement("p");
    readStatus.textContent = book.isRead ? "Read" : "Not Read";

    // delete and edit functionalities

    let buttons = document.createElement("div");
    buttons.classList.add("book-buttons");
    let del = document.createElement("button");
    del.innerHTML = "delete";
    del.addEventListener("click", () => {
      bookCard.remove();
      let index = library.indexOf(book);
      library.splice(index, 1);
      localStorage.setItem("library", JSON.stringify(library));
    });

    let edit = document.createElement("button");
    edit.innerHTML = "edit";

    edit.addEventListener("click", () => {
      const newTitle = prompt("Enter new title:", book.title);
      const newAuthor = prompt("Enter new author:", book.author);
      const newPages = prompt("Enter new number of pages:", book.noOfPages);
      const newIsRead = confirm(
        "Have you read this book? OK = Read, Cancel = Not Read"
      );

      // Update the book object in the array
      book.title = newTitle;
      book.author = newAuthor;
      book.noOfPages = newPages;
      book.isRead = newIsRead;

      // Update localStorage
      localStorage.setItem("library", JSON.stringify(library));

      // Re-render the book cards
      displayBooks();
    });

    buttons.append(del, edit);

    bookContent.append(bookTitle, bookAuthor, pages, readStatus);
    bookCard.append(bookContent, buttons);
    content.appendChild(bookCard);
  });
}
