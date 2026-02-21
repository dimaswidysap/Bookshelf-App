console.log("Hello, world!");

function displayBooks(bookList) {
  bookList.forEach((items) => {
    const container = document.createElement("div");
    const h3 = document.createElement("h3");
    const pAuthor = document.createElement("p");
    const pYear = document.createElement("p");
    const conButton = document.createElement("div");
    const btnHapus = document.createElement("button");
    const btnEdit = document.createElement("button");

    if (items.isComplete === true) {
      conRead.appendChild(container);
    } else {
      conUnread.appendChild(container);
      const btnSudahDibaca = document.createElement("button");
      conButton.appendChild(btnSudahDibaca);
      btnSudahDibaca.textContent = "Selesai dibaca";
      btnSudahDibaca.setAttribute("data-testid", "bookItemIsCompleteButton");

      btnSudahDibaca.addEventListener("click", () => {
        const bookId = items.id;
        const bookIndex = books.findIndex((b) => b.id === bookId);
        if (bookIndex !== -1) {
          books[bookIndex].isComplete = true;
          localStorage.setItem("books", JSON.stringify(books));
          conUnread.innerHTML = "";
          conRead.innerHTML = "";
          displayBooks(books);
        }
      });
    }

    container.appendChild(h3);
    container.appendChild(pAuthor);
    container.appendChild(pYear);
    container.appendChild(conButton);
    conButton.appendChild(btnHapus);
    conButton.appendChild(btnEdit);

    container.classList.add("container-card");
    conButton.classList.add("container-button");

    container.setAttribute("data-bookid", `${items.id}`);
    container.setAttribute("data-testid", "bookItem");

    h3.textContent = `${items.title}`;
    h3.setAttribute("data-testid", "bookItemTitle");

    pAuthor.textContent = `Penulis: ${items.author}`;
    pAuthor.setAttribute("data-testid", "bookItemAuthor");

    pYear.textContent = `Tahun: ${items.year}`;
    pYear.setAttribute("data-testid", "bookItemYear");

    btnHapus.textContent = "Hapus Buku";
    btnHapus.setAttribute("data-testid", "bookItemDeleteButton");

    btnEdit.textContent = "Edit Buku";
    btnEdit.setAttribute("data-testid", "bookItemEditButton");

    btnHapus.addEventListener("click", () => {
      const idBuku = items.id;

      books = books.filter((book) => book.id !== idBuku);

      localStorage.setItem("books", JSON.stringify(books));

      conUnread.innerHTML = "";
      conRead.innerHTML = "";
      displayBooks(books);
    });
  });
}

function editBuku() {
  const container = document.createElement("section");
  const form = document.createElement("form");

  container.classList.add("con-edit");
  form.classList.add("edit-form");

  document.body.appendChild(container);
  container.appendChild(form);
}

// editBuku();

let books = JSON.parse(localStorage.getItem("books")) || [];
const formCari = document.getElementById("searchBook");
const bookCheck = document.getElementById("bookFormIsComplete");
const conUnread = document.getElementById("incompleteBookList");
const conRead = document.getElementById("completeBookList");
const inputCari = document.getElementById("searchBookTitle");
const btnCari = document.getElementById("searchSubmit");
const content = document.querySelector(".hjuijh");

bookCheck.addEventListener("change", (event) => {
  if (event.target.checked) {
    content.classList.add("displayNone");
  } else {
    content.classList.remove("displayNone");
  }
});

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const bookData = {
    id: Date.now(),
    title: title,
    author: author,
    year: Number(year),
    isComplete: isComplete,
  };

  books.push(bookData);

  localStorage.setItem("books", JSON.stringify(books));

  conUnread.innerHTML = "";
  conRead.innerHTML = "";
  displayBooks(books);

  // bookForm.reset();
  location.reload();
});

btnCari.addEventListener("click", (event) => {
  event.preventDefault();
  const cariBuku = inputCari.value.trim();

  if (cariBuku === "") {
    conUnread.innerHTML = "";
    conRead.innerHTML = "";
    displayBooks(books);
    return;
  }

  const cariBukuLower = cariBuku.toLowerCase();
  const tampilkan = books.filter((items) => {
    return items.title.toLowerCase().includes(cariBukuLower);
  });

  conUnread.innerHTML = "";
  conRead.innerHTML = "";
  displayBooks(tampilkan);

  formCari.reset();
});

displayBooks(books);
