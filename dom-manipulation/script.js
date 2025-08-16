// Quotes array with objects containing text and category
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" }
];

// Function to display a random quote
function displayRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML =
    `"${quote.text}" <br><em>Category: ${quote.category}</em>`;
}

// Function to add a new quote
function addQuote() {
  let newText = document.getElementById("newQuoteText").value.trim();
  let newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    document.getElementById("quoteDisplay").innerHTML =
      `"${newText}" <br><em>Category: ${newCategory}</em>`;
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both fields!");
  }
}

// Event listener for the Show New Quote button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
