// Each book needs a title, author, pages, if it was read yet (boolean)
const books = [];
const booksDisplay = document.querySelector(".books");
const bookForm = document.querySelector(".book-form");
const closeForm = document.querySelector(".book-form > .close");
const bookBtn = document.querySelector (".add-book");


function Book(title, author, pages, read_yet) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read_yet = read_yet;
} 

function displayBooks() {
  while (booksDisplay.firstChild) { booksDisplay.removeChild(booksDisplay.firstChild)}; // This means we reload the books each time. Pretty inefficient
  books.forEach((book) => booksDisplay.appendChild(createBookNode(book)));
}
function createBookNode(book) {
  let newBookContainer = document.createElement("div");
  let title = document.createElement("h1");
  let author = document.createElement("span");
  let pages = document.createElement("span");
  let read_yet = document.createElement("span");

  newBookContainer.classList.add("book");
  author.classList.add("author")
  title.classList.add("title");
  pages.classList.add("pages");
  read_yet.classList.add("read_yet") ;
  
  title.textContent = book.title ;
  author.textContent = `By: ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  read_yet.textContent = book.read_yet ? "The book has been read" : "This book has not been read yet";


  [title, author, pages, read_yet].forEach((attr) => { newBookContainer.append(attr)})

  return newBookContainer;
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


 
