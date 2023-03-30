const title = document.querySelector("#exhibit-title");
const description = document.querySelector("#exhibit-description");
const ticketsBought = document.querySelector("#tickets-bought");
const ticketsBoughtButton = document.querySelector("#buy-tickets-button");
const comments = document.querySelector("#comments-section");
const commentForm = document.querySelector("#comment-form");
const image = document.querySelector("#exhibit-image");

document.addEventListener("DOMContentLoaded", getFirstExhibit);
commentForm.addEventListener("submit", addComment);
ticketsBoughtButton.addEventListener("click", increaseTicketCount);

function getFirstExhibit() {
  return fetch("http://localhost:3000/current-exhibits")
    .then((res) => res.json())
    .then((data) => {
      let firstExhibit = data[0];
      extractExhibitData(firstExhibit);
    });
}

function extractExhibitData(exhibit) {
  title.innerHTML = exhibit.title;
  description.innerHTML = exhibit.description;
  ticketsBought.innerHTML = exhibit.tickets_bought;
  image.src = exhibit.image;

  exhibit.comments.forEach((comment) => {
    appendComment(comment);
  });
}

function appendComment(comment) {
  let currentComment = document.createElement("p");
  currentComment.innerHTML = comment;
  comments.appendChild(currentComment);
}

function addComment(event) {
  event.preventDefault();
  appendComment(event.target[0].value);
}

function increaseTicketCount(event) {
  event.preventDefault();
  console.log(ticketsBought.innerHTML);
  let currentCount = ticketsBought.innerHTML.split(" ")[0];
  console.log(currentCount);
  currentCount++;
  let newCount = currentCount + " Tickets Bought";
  console.log(newCount);
  ticketsBought.innerHTML = newCount;
}

