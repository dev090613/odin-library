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
  #read;

  constructor(title, author, pages, read) {
    this.id = genId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.#read = read;
  }

  get read() {
    return this.#read;
  }

  toggleRead() {
    this.#read = !this.#read;
  }

  static fromFormData(formData) {
    return new Book(
      formData.get("title").trim(),
      formData.get("author").trim(),
      Number(formData.get("pages")),
      formData.get("read") === "on",
    );
  }
}

function addBookToLibrary(book) {
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

addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));

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
  addBookToLibrary(Book.fromFormData(new FormData(bookForm)));
  bookDialog.close();
});
