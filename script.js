class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID(); // Unique identifier
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.library = JSON.parse(localStorage.getItem("library")) || [];

    // Select elements from the DOM
    this.content = document.querySelector(".content");
    this.dialog = document.querySelector("#dialog");
    this.form = document.querySelector("#newBook");
    this.titleInput = document.querySelector("#title");
    this.authorInput = document.querySelector("#author");
    this.pagesInput = document.querySelector("#pages");
    this.showDialogButton = document.querySelector("#showDialog");

    // Event listeners
    this.showDialogButton.addEventListener("click", () =>
      this.dialog.showModal()
    );
    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));

    // Display existing books
    this.displayBooks();
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();
    const pages = parseInt(this.pagesInput.value);
    const isRead = false; // Default to false since there was no checkbox in the HTML you shared.

    if (title && author && pages > 0) {
      this.addBook(title, author, pages, isRead);
      this.dialog.close();
      this.form.reset();
    } else {
      alert("Please fill in all fields correctly!");
    }
  }

  addBook(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    this.library.push(newBook);
    this.saveLibrary();
    this.displayBooks();
  }

  deleteBook(bookId) {
    this.library = this.library.filter((book) => book.id !== bookId);
    this.saveLibrary();
    this.displayBooks();
  }

  editBook(book) {
    const newTitle = prompt("Enter new title:", book.title);
    const newAuthor = prompt("Enter new author:", book.author);
    const newPages = prompt("Enter new number of pages:", book.pages);
    const newIsRead = confirm(
      "Have you read this book? OK = Read, Cancel = Not Read"
    );

    if (newTitle && newAuthor && newPages > 0) {
      book.title = newTitle.trim();
      book.author = newAuthor.trim();
      book.pages = parseInt(newPages);
      book.isRead = newIsRead;

      this.saveLibrary();
      this.displayBooks();
    } else {
      alert("Invalid input!");
    }
  }

  saveLibrary() {
    localStorage.setItem("library", JSON.stringify(this.library));
  }

  displayBooks() {
    this.content.innerHTML = "";

    if (this.library.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "Your library is empty! Add some books!";
      this.content.appendChild(emptyMessage);
      return;
    }

    this.library.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      const bookContent = document.createElement("div");
      bookContent.classList.add("book-content");

      const bookTitle = document.createElement("h3");
      bookTitle.classList.add("book-title");
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement("h4");
      bookAuthor.classList.add("book-author");
      bookAuthor.textContent = `By: ${book.author}`;

      const pages = document.createElement("p");
      pages.classList.add("book-pages");
      pages.textContent = `${book.pages} pages`;

      const readStatus = document.createElement("p");
      readStatus.classList.add("book-status");
      readStatus.textContent = book.isRead ? "Read" : "Not Read";

      const buttons = document.createElement("div");
      buttons.classList.add("book-buttons");

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => this.deleteBook(book.id));

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => this.editBook(book));

      buttons.append(deleteBtn, editBtn);

      bookContent.append(bookTitle, bookAuthor, pages, readStatus);
      bookCard.append(bookContent, buttons);
      this.content.appendChild(bookCard);
    });
  }
}

// Create the Library instance when page loads
const libraryApp = new Library();
