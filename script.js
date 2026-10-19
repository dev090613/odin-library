const myLibrary = [];

const makeId = () =>
  crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = makeId();
}

function addBookToLibrary(title, author, pages, read) {

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

};

addBookToLibrary("모순", "양귀자", 100, true);
console.log(myLibrary);

