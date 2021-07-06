let myLibrary = [];

const newBook = new Book("Harry Potter", "Rowling, J.K.", true);
const newBook2 = new Book("The Bible", "Jesus", false);
const newBook3 = new Book("The Shallows", "Nicolas Carr", false);

addBookToLibrary(newBook);
addBookToLibrary(newBook2);
addBookToLibrary(newBook3);

displayBooks();

function Book(title, author, readStatus) {
  this.title = title;
  this.author = author;
  this.readStatus = readStatus;
  //   this.pages = pages;
  //   this.info = function () {
  //     return `${title} by ${author} is ${pages} pages long.`;
  //   };
}

Book.prototype.toggleRead = function () {
  if (this.readStatus == true) {
    this.readStatus = false;
  } else this.readStatus = true;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}
function displayBooks() {
  clearTable();
  for (item in myLibrary) {
    generateBookCards(myLibrary[item]);
  }
}

function generateBookCards(book) {
  const container = document.querySelector("#books");
  const card = document.createElement("tr");
  card.classList.add("card");
  container.appendChild(card);

  const title = document.createElement("td");
  title.classList.add("title");
  title.textContent = book.title;
  card.appendChild(title);

  const author = document.createElement("td");
  author.classList.add("author");
  author.textContent = book.author;
  card.appendChild(author);

  const read = document.createElement("td");
  read.classList.add("read");
  read.appendChild(readLabel(book, book.readStatus));
  card.appendChild(read);
  //this needs to be done in an easier way
  read.dataset.indexNumber = myLibrary.indexOf(book);

  const remove = document.createElement("td");
  remove.classList.add("remove");
  //  same as above, this needs to be done in an easier way
  remove.dataset.indexNumber = myLibrary.indexOf(book);
  //change this later
  remove.textContent = "X";
  card.appendChild(remove);
  remove.addEventListener("click", function (e) {
    removeBook(e);
  });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//remove book
function removeBook(e) {
  let indexNumber = e.target.dataset.indexNumber;
  myLibrary.splice(indexNumber, 1);

  displayBooks();
}

function clearTable() {
  let cards = document.getElementsByClassName("card");
  while (cards[0]) {
    cards[0].parentNode.removeChild(cards[0]);
  }
}

//event listener for form

// let myForm = document.querySelector("#myForm2");
// myForm.addEventListener("submit", () => console.log("works"));

function addBook() {
  let inputs = document.querySelector("#myActualForm").elements;
  let newTitle = inputs[0].value;
  let newAuthor = inputs[1].value;
  document.getElementById("myActualForm").reset();

  console.log(newTitle);

  //   alert(newTitle + newAuthor);
  console.table(myLibrary);

  const newBook = new Book(newTitle, newAuthor);
  addBookToLibrary(newBook);

  console.table(myLibrary);

  displayBooks();
  closeForm();
  return false;
}

function readStatus(status) {
  if (status == true) {
    return "read";
  } else return "unread";
}

function readLabel(book) {
  let status = book.readStatus;
  const label = document.createElement("p");
  label.classList.add("readlabel");
  if (status == true) {
    label.textContent = "read";
    label.style.backgroundColor = "darkgreen";
  } else label.textContent = "unread";
  console.table(myLibrary);
  label.addEventListener("click", function (e) {
    book.toggleRead();
    displayBooks();
  });
  return label;
}
