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

function addBookToLibrary(title, author, id, pages, read) {
  const book = new Book(title, author, id, pages, read)

  myLibrary.push(book);
}

addBookToLibrary('어린왕자', 'Antoine de Saint-Exupery', 144, true)
console.log(myLibrary[0])
