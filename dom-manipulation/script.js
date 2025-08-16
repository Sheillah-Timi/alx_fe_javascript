// ====== INITIAL QUOTES ======
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" }
];

// ====== LOCAL STORAGE ======
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ====== DISPLAY RANDOM QUOTE ======
function showRandomQuote() {
  const filter = document.getElementById("categoryFilter").value;
  const filteredQuotes = filter === "all" ? quotes : quotes.filter(q => q.category === filter);
  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available for this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML =
    `"${quote.text}" <br><em>Category: ${quote.category}</em>`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ====== ADD QUOTE ======
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();
  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    saveQuotes();
    populateCategories();
    showRandomQuote();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both fields!");
  }
}

// ====== CREATE ADD QUOTE FORM ======
function createAddQuoteForm() {
  const container = document.getElementById("formContainer");
  container.innerHTML = "";

  const inputText = document.createElement("input");
  inputText.id = "newQuoteText";
  inputText.type = "text";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.id = "newQuoteCategory";
  inputCategory.type = "text";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Quote";
  addButton.addEventListener("click", addQuote);

  container.appendChild(inputText);
  container.appendChild(inputCategory);
  container.appendChild(addButton);
}

// ====== POPULATE CATEGORIES ======
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const lastSelected = localStorage.getItem("lastCategory") || "all";

  select.innerHTML = '<option value="all">All Categories</option>';
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  select.value = lastSelected;
}

// ====== FILTER QUOTES ======
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastCategory", selectedCategory);
  showRandomQuote();
}

// ====== JSON EXPORT ======
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

// ====== JSON IMPORT ======
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Error parsing JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ====== SERVER SYNC ======
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    const serverQuotes = serverData.slice(0,5).map(item => ({
      text: item.title,
      category: item.body || "Server"
    }));

    let newQuotes = false;
    serverQuotes.forEach(sq => {
      const exists = quotes.some(lq => lq.text === sq.text && lq.category === sq.category);
      if (!exists) {
        quotes.push(sq);
        newQuotes = true;
      }
    });

    if (newQuotes) {
      saveQuotes();
      populateCategories();
      alert("Quotes updated from server!");
    }
  } catch(err) {
    console.error("Failed to fetch from server:", err);
  }
}

async function syncQuotes() {
  try {
    for (const quote of quotes) {
      await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quote)
      });
    }
  } catch(err) {
    console.error("Failed to sync quotes to server:", err);
  }
}

// Periodic server check
setInterval(fetchQuotesFromServer, 60000);

// ====== INITIALIZE ======
createAddQuoteForm();
populateCategories();
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);
document.getElementById("exportJson").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("syncServer").addEventListener("click", () => {
  fetchQuotesFromServer();
  syncQuotes();
});

// Load last quote
const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
  document.getElementById("quoteDisplay").innerHTML =
    `"${lastQuote.text}" <br><em>Category: ${lastQuote.category}</em>`;
}
