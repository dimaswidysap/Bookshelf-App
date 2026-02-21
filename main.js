// Do your work here...

console.log("Hello, world!");

let books = JSON.parse(localStorage.getItem("books")) || [];

const bookCheck = document.getElementById("bookFormIsComplete");

bookCheck.addEventListener("change", () => {
  const content = document.querySelector(".hjuijh");
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

  location.reload();
});
