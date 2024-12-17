let itemsList = [];

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
function displayMetadata(metadata) {
  document.querySelector("#metadata h4").textContent += ": " + metadata.author;
  document.querySelector("#metadata p").textContent +=
    ": " + formatDate(metadata.creationDate);
}
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

const filterBtn = document.getElementById("filter-btn");

filterBtn.addEventListener("click", function () {
  const filterItems = itemsList.filter((item) => {
    return item.price > 500;
  });
  itemsList = [...filterItems];
  displayCards(itemsList);
});

const sortBtn = document.getElementById("sort-btn");

sortBtn.addEventListener("click", function () {
  const sortedItems = sortItemByPrice(itemsList);
  itemsList = [...sortedItems];
  displayCards(itemsList);
});

function sortedItems(items){
  return items.sort((a, b) => a.price - b.price);
}
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
