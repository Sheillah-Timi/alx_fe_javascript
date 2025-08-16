// Quotes array with text and category
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not in what you have, but who you are.", category: "Motivation" }
];

// Function: displayRandomQuote
function displayRandomQuote() {
  // Select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the DOM
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (quoteDisplay) {
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }
}

// Function: addQuote
function addQuote(text, category) {
  // Add new quote object to the array
  quotes.push({ text: text, category: category });

  // Update the DOM immediately with the new quote
  displayRandomQuote();
}

// Event listener for the “Show New Quote” button
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("newQuoteBtn");
  if (btn) {
    btn.addEventListener("click", displayRandomQuote);
  }
});
