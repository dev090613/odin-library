function genId() {
  const b = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}

const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = genId()
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read)

  myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true)
addBookToLibrary('1984', 'George Orwell', 328, true)
