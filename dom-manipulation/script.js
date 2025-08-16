// Quotes array with objects { text, category }
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Do one thing every day that scares you.", category: "Inspiration" }
];

// Function: displayRandomQuote
function displayRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  // Update DOM using textContent (not innerHTML)
  document.getElementById("quoteText").textContent = `"${randomQuote.text}"`;
  document.getElementById("quoteCategory").textContent = `- ${randomQuote.category}`;
}

// Function: addQuote
function addQuote() {
  let newText = document.getElementById("newQuoteText").value.trim();
  let newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText && newCategory) {
    // Add new quote object to array
    quotes.push({ text: newText, category: newCategory });

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Show new quote
    displayRandomQuote();
  } else {
    alert("Please enter both a quote and a category!");
  }
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Display one quote on page load
displayRandomQuote();
