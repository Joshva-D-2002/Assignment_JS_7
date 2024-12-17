let itemsList = [];

// 1. Create a JSON file, that should contain the following data and use AJAX to load data from a JSON file .

fetch("data/items.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Problem Occured");
    }
    return response.json();
  })
  .then((data) => {
    const description = data.description;
    const metadata = data.metadata;
    const items = data.items;
    document.getElementById("o-description").textContent = description;
    displayMetadata(metadata);
    itemsList = [...items];
    displayCards(itemsList);
  })
  .catch((err) => {
    console.log(err);
  });

// Display each item in a card format on the HTML page. Each card should show the name, description, price of the item, the general description from the JSON file at the top of the card section, the metadata information (author and creation date) at the bottom of the card section.

function displayCards(items) {
  const cardSection = document.getElementById("card-section");
  cardSection.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    cardSection.appendChild(card);
    card.innerHTML = `<h2>${item.name}</h2>
        <P>${item.description}</P>
        <h3>$ ${item.price}</h3>`;
  });
}

// Convert the creation date format from "YYYY-MM-DD" to a more readable format, such as "January 10, 2024"(don't hardcode it)

function formatDate(d) {
  const date = new Date(d);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

// Write a JavaScript function to filter items in the array based on price (e.g., show only items over $500).

const filterBtn = document.getElementById("filter-btn");

filterBtn.addEventListener("click", function () {
  const filterItems = itemsList.filter((item) => {
    return item.price > 500;
  });
  itemsList = [...filterItems];
  displayCards(itemsList);
});

// Create a function to sort the array of items by name or price in ascending or descending order.

const sortBtn = document.getElementById("sort-btn");

sortBtn.addEventListener("click", function () {
  const sortedItems = sortItemByPrice(itemsList);
  itemsList = [...sortedItems];
  displayCards(itemsList);
});

function sortItemByPrice(items) {
  return items.sort((a, b) => a.price - b.price);
}

// Create a simple form (also add validation) to add a new items to the items array and display it immediately in the card section.

const form1 = document.getElementById("addProduct");

form1.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const nameErr = document.getElementById("nameErr");
  const descriptionErr = document.getElementById("descriptionErr");
  const priceErr = document.getElementById("priceErr");

  nameErr.textContent = "";
  descriptionErr.textContent = "";
  priceErr.textContent = "";

  if (name.trim() === "") {
    nameErr.textContent = "Name is Required";
    isValid = false;
  }
  if (description.trim() === "") {
    descriptionErr.textContent = "Decription is Requires";
    isValid = false;
  }
  if (price.trim() === "") {
    priceErr.textContent = "Price is Required";
    isValid = false;
  }

  if (isValid) {
    const item = {
      name: `${name}`,
      description: `${description}`,
      price: `${price}`,
    };
    itemsList.push(item);
    displayCards(itemsList);
    form1.reset();
  }
});

// Write a function to retrieve and display the author and creation date from the nested metadata object in the JSON file.

function displayMetadata(metadata) {
  document.querySelector("#metadata h4").textContent += ": " + metadata.author;
  document.querySelector("#metadata p").textContent +=
    ": " + formatDate(metadata.creationDate);
}
