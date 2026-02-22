const conUnread = document.getElementById("incompleteBookList");
const conRead = document.getElementById("completeBookList");
const formCari = document.getElementById("searchBook");
const bookCheck = document.getElementById("bookFormIsComplete");
const inputCari = document.getElementById("searchBookTitle");
const btnCari = document.getElementById("searchSubmit");
const content = document.querySelector(".hjuijh");
const bookForm = document.getElementById("bookForm");

let books = JSON.parse(localStorage.getItem("books")) || [];

function editBuku(buku) {
  buku.forEach((items) => {
    const existingForm = document.querySelector(".con-edit");
    if (existingForm) {
      existingForm.remove();
    }

    const container = document.createElement("section");
    const form = document.createElement("form");
    const h2 = document.createElement("h2");

    container.classList.add("con-edit");
    form.classList.add("edit-form");

    document.body.appendChild(container);
    container.appendChild(form);
    form.appendChild(h2);

    h2.textContent = "Edit Buku";
    form.setAttribute("data-testid", "editForm");

    const divEditBukuJudul = document.createElement("div");
    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "bookFormEdit");
    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("id", "bookFormEdit");
    inputTitle.setAttribute("data-testid", "bookFormEditInput");
    inputTitle.setAttribute("value", `${items.title}`);
    inputTitle.required = true;

    form.appendChild(divEditBukuJudul);
    divEditBukuJudul.appendChild(labelTitle);
    divEditBukuJudul.appendChild(inputTitle);
    labelTitle.textContent = "Edit Judul?";

    const divEditBukuAuthor = document.createElement("div");
    const labelTitleAuthor = document.createElement("label");
    labelTitleAuthor.setAttribute("for", "bookFormEditAuthor");
    const inputAuthor = document.createElement("input");
    inputAuthor.setAttribute("id", "bookFormEditAuthor");
    inputAuthor.setAttribute("data-testid", "bookFormEditInputAuthor");
    inputAuthor.setAttribute("value", `${items.author}`);
    inputAuthor.required = true;

    form.appendChild(divEditBukuAuthor);
    divEditBukuAuthor.appendChild(labelTitleAuthor);
    divEditBukuAuthor.appendChild(inputAuthor);
    labelTitleAuthor.textContent = "Edit Penulis?";

    const divEditBukuYear = document.createElement("div");
    const labelTitleYear = document.createElement("label");
    labelTitleYear.setAttribute("for", "bookFormEditYear");
    const inputYear = document.createElement("input");
    inputYear.setAttribute("id", "bookFormEditYear");
    inputYear.setAttribute("data-testid", "bookFormEditInputYear");
    inputYear.setAttribute("value", `${items.year}`);
    inputYear.setAttribute("type", "number");
    inputYear.required = true;

    form.appendChild(divEditBukuYear);
    divEditBukuYear.appendChild(labelTitleYear);
    divEditBukuYear.appendChild(inputYear);
    labelTitleYear.textContent = "Edit Tahun?";

    const buttonSimpan = document.createElement("button");
    Object.assign(buttonSimpan.style, {
      width: "50%",
    });
    form.appendChild(buttonSimpan);
    buttonSimpan.classList.add("button-86");
    buttonSimpan.textContent = "Simpan";
    buttonSimpan.setAttribute("data-testid", "bookFormEditSubmitButton");

    const buttonBatal = document.createElement("button");
    Object.assign(buttonBatal.style, {
      width: "50%",
    });
    form.appendChild(buttonBatal);
    buttonBatal.classList.add("button-86");
    buttonBatal.textContent = "Batal";
    buttonBatal.setAttribute("data-testid", "bookFormEditCancelButton");

    buttonBatal.addEventListener("click", (event) => {
      event.preventDefault();
      container.remove();
    });

    form.addEventListener("submit", (eventEdit) => {
      eventEdit.preventDefault();

      const newTitle = inputTitle.value;
      const newAuthor = inputAuthor.value;
      const newYear = Number(inputYear.value);

      const bookIndex = books.findIndex((book) => book.id === items.id);

      if (bookIndex !== -1) {
        books[bookIndex] = {
          ...books[bookIndex],
          title: newTitle,
          author: newAuthor,
          year: newYear,
        };

        localStorage.setItem("books", JSON.stringify(books));
        container.remove();
        displayBooks(books);
      }
    });
  });
}

function displayBooks(bookList) {
  conUnread.innerHTML = "";
  conRead.innerHTML = "";

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

      const btnBelumSelesai = document.createElement("button");
      conButton.appendChild(btnBelumSelesai);
      btnBelumSelesai.textContent = "Belum selesai dibaca";
      btnBelumSelesai.setAttribute("data-testid", "bookItemIsCompleteButton");

      btnBelumSelesai.addEventListener("click", () => {
        const bookId = items.id;
        const bookIndex = books.findIndex((b) => b.id === bookId);
        if (bookIndex !== -1) {
          books[bookIndex].isComplete = false;
          localStorage.setItem("books", JSON.stringify(books));
          displayBooks(books);
        }
      });
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
      displayBooks(books);
    });

    btnEdit.addEventListener("click", function () {
      const bookId = items.id;
      const bukuDiedit = books.filter((items) => {
        return items.id === bookId;
      });
      editBuku(bukuDiedit);
    });
  });
}

bookCheck.addEventListener("change", (event) => {
  if (event.target.checked) {
    content.classList.add("displayNone");
  } else {
    content.classList.remove("displayNone");
  }
});

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

  displayBooks(books);
  bookForm.reset();
  content.classList.remove("displayNone");
});

btnCari.addEventListener("click", (event) => {
  event.preventDefault();
  const cariBuku = inputCari.value.trim();

  if (cariBuku === "") {
    displayBooks(books);
    return;
  }

  const cariBukuLower = cariBuku.toLowerCase();
  const tampilkan = books.filter((items) => {
    return items.title.toLowerCase().includes(cariBukuLower);
  });

  displayBooks(tampilkan);
  formCari.reset();
  content.classList.remove("displayNone");
});

displayBooks(books);
