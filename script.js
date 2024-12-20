// Each book needs a title, author, pages, if it was read yet (boolean)
const books = [];

function Book(title, author, pages, read_yet) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read_yet = read_yet;
} 

function addBookToLibrary(title, author, pages, read_yet) {
  books.push(new Book(title, author, pages, read_yet));
}

addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 336, true);


 