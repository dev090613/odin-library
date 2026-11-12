const cardContainer = document.querySelector(".card-container");
const bookTemplate = document.querySelector("#book-template");
const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("#bookForm");
const addBookBtn = document.querySelector(".add-book-btn");

const myLibrary = [];

function genId() {
  const b = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}

class Book {
  constructor(title, author, pages, read) {
    this.id = genId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead = () => {
    this.read = !this.read;
  }
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
    const readBtn = card.querySelector('.read-btn')

    card.dataset.id = book.id;
    card.querySelector(".book-title").textContent = book.title;
    card.querySelector(".book-author").textContent = book.author;
    card.querySelector(".book-pages").textContent = `${book.pages} pages`;
    readBtn.textContent = book.read ? "read" : "unread";
    readBtn.classList.toggle('is-read', book.read);

    cardContainer.append(card);
  }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

cardContainer.addEventListener("click", (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  const book = myLibrary.find( (b) => b.id === card.dataset.id );
  if (!book) return;

  if (e.target.closest(".read-btn")) {
    book.toggleRead();
    renderLibrary();
    return;
  }

  if (e.target.closest('.delete-btn')) {
    const index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
    renderLibrary();
    return;
  }
});

addBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

bookDialog.addEventListener( "click", (e) => {
  if (e.target.closest('.cancel-btn')) {
    bookDialog.close();
  }
});

bookDialog.addEventListener( "close", () => {
  bookForm.reset();
});

bookDialog.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(bookForm);

  addBookToLibrary(
    data.get("title").trim(),
    data.get("author").trim(),
    Number(data.get("pages")),
    data.get("read") === "on"
  );

  bookDialog.close();
})
