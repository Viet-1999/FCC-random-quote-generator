// Getting the quote box
const quoteBox = document.getElementById("quote-box");

// Getting the quote
const texts = document.getElementById("text");

// Getting the author
const authors = document.getElementById("author");

// Getting the buttons
const button = document.getElementById("new-quote");

// Getting the tweet button
const tweetButton = document.getElementById("tweet-quote");

let quotesCache = null;

// An arrow function for getting the quote randomly
const displayQuote = async () => {
  const url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  // Disable the button while fetching
  button.disabled = true;
  texts.innerHTML = "Loading...";
  authors.innerHTML = "";

  try {
    if (!quotesCache) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      quotesCache = await response.json();
    }

    // Check if the data has a quotes array and if it's not empty
    if (!quotesCache.quotes || quotesCache.quotes.length === 0) {
      throw new Error("No quotes found in the response.");
    }

    // Select a random index for the quote
    const index = Math.floor(Math.random() * quotesCache.quotes.length);

    // Fetch the quote and author from the correct field names
    const quote = quotesCache.quotes[index]?.quote;
    let author = quotesCache.quotes[index]?.author;

    // If quote or author is undefined, handle the error
    if (!quote) {
      throw new Error("Quote not found for the selected index.");
    }

    // Making the author anonymous if no author is present
    if (!author) {
      author = "Anonymous";
    }

    // Updating the quote and author in the HTML
    texts.innerHTML = quote;
    authors.innerHTML = "~ " + author;

    // Updating the tweet button with the encoded quote and author
    tweetButton.href =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(quote + " ~ " + author);
  } catch (error) {
    console.error("Error fetching the quote: ", error);
    texts.innerHTML = "Unable to fetch quote at the moment";
    authors.innerHTML = "";
  } finally {
    // Re-enable the button
    button.disabled = false;
  }
};

// Adding an onclick listener for the button
button.addEventListener("click", displayQuote);

// Call displayQuote() function once to load a quote when the page loads
displayQuote();
