let currentCard = 0; // Start from the first card

function showNextCard() {
  const cardContainer = document.getElementById("card-container"); // Corrected the id
  const cards = document.querySelectorAll(".sec3card");

  if (currentCard < cards.length - 1) {
    cards[currentCard].style.display = "none";
    currentCard++;
    cards[currentCard].style.display = "block"; // Use 'block' or 'inline-block' to show the card
    cardContainer.scrollLeft += cards[currentCard].offsetWidth;
  }
}

function showPreviousCard() {
  const cardContainer = document.getElementById("card-container"); // Corrected the id
  const cards = document.querySelectorAll(".sec3card");

  if (currentCard > 0) {
    cards[currentCard].style.display = "none";
    currentCard--;
    cards[currentCard].style.display = "block"; // Use 'block' or 'inline-block' to show the card
    cardContainer.scrollLeft -= cards[currentCard].offsetWidth;
  }
}
