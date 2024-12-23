// Each book needs a title, author, pages, if it was read yet (boolean)
const books = [];
const booksDisplay = document.querySelector(".books");
const bookForm = document.querySelector(".book-form");
const closeForm = document.querySelector(".book-form > .close");
const bookBtn = document.querySelector (".add-book");

class Book {
  constructor(title, author, pages, read_yet) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_yet = read_yet;
  }

  
  createBookNode(i) {
      // Initialization
      let newBookContainer = document.createElement("div");
      let title = document.createElement("h1");
      let author = document.createElement("span");
      let pages = document.createElement("span");
      let read_yet = document.createElement("span");
      let deleteBtn = document.createElement("button")
      let readBtn = document.createElement("button")

      // Add details
      newBookContainer.classList.add("book");
      author.classList.add("author")
      title.classList.add("title");
      pages.classList.add("pages");
      read_yet.classList.add("read_yet");
      deleteBtn.classList.add("delete-btn");
      readBtn.classList.add("read-btn")


      // Add content
      title.textContent = this.title ;
      author.textContent = `By: ${this.author}`;
      pages.textContent = `${this.pages} pages`;
      read_yet.textContent = this.read_yet ? "The book has been read" : "This book has not been read yet";
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute("book-index", i);
      readBtn.setAttribute("book-index", i);
      readBtn.textContent = this.read_yet ? "unread" : "read";
      
      // Put it all into place
      [title, author, pages, read_yet, readBtn, deleteBtn].forEach((attr) => { newBookContainer.append(attr)});

      deleteBtn.addEventListener("click", deleteBook);
      readBtn.addEventListener("click", toggleRead);

      return newBookContainer;
  };
}

function displayBooks() {
  while (booksDisplay.firstChild) { booksDisplay.removeChild(booksDisplay.firstChild)}; // This means we reload the books each time. Pretty inefficient
  books.forEach((book, i) => booksDisplay.appendChild(book.createBookNode(i)));
}

function deleteBook() { // Happens from inside one of the delete buttons
  books.splice(this.getAttribute("book-index"), 1);
  displayBooks();
}

function toggleRead() { // Happens from the inside of the read button
  books[this.getAttribute("book-index")].read_yet = !books[this.getAttribute("book-index")].read_yet;
  displayBooks();
}

function addBookToLibrary(title, author, pages, read_yet) {
  books.push(new Book(title, author, pages, read_yet));
  displayBooks();
}

addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 336, true);

// So the form go in and out of the page
bookBtn.addEventListener("click", () => { bookForm.showModal() });
closeForm.addEventListener("click", () => { bookForm.close() });
bookForm.addEventListener("submit", (e) => { // For when you submit the form, add a book, clear out the form, and close it
  e.preventDefault();

  const bookTitle = document.querySelector("#book-title");
  const bookAuthor = document.querySelector("#book-author");
  const bookPages = document.querySelector("#book-pages");
  const bookReadYet = document.querySelector("#book-read-yet");
  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookReadYet.checked ); // "on" means the book was red
  [bookTitle, bookAuthor, bookPages].forEach((atr) => atr.value = "");
  bookReadYet.checked =  false;

  bookForm.close();

})


 
