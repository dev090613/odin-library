const cardContainer = document.querySelector(".card-container");
const bookTemplate = document.querySelector("#book-template");
const myLibrary = [];

function genId() {
  const b = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}

function Book(title, author, pages, read) {
  this.id = genId();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  renderLibrary();
}

function renderLibrary() {
  cardContainer.replaceChildren();

  for (const book of myLibrary) {
    const card = bookTemplate.content.firstElementChild.cloneNode(true);

    card.dataset.id = book.id;
    card.querySelector(".book-title").textContent = book.title;
    card.querySelector(".book-author").textContent = book.author;
    card.querySelector(".book-pages").textContent = `${book.pages} pages`;
    card.querySelector(".read-btn").textContent = book.read ? "read" : "unread";

    cardContainer.append(card);
  }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, true);
