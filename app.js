// ------------------------
// Redirect Button
// ------------------------
const getLocationBtn = document.getElementById("getLocationBtn");
if (getLocationBtn) {
  getLocationBtn.addEventListener("click", function () {
    window.location.href = "location.html"; // redirect
  });
}

// ------------------------
// DOM ELEMENTS
// ------------------------
let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");

let products = [];
let cart = [];

// Prevent script breaking if elements missing
if (iconCart) {
  iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
}
if (closeCart) {
  closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
}

// ------------------------
// Add Products to HTML
// ------------------------
const addDataToHTML = () => {
  if (!listProductHTML) return;

  if (products.length > 0) {
    listProductHTML.innerHTML = ""; // clear old items

    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");

      newProduct.innerHTML = `
        <img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">₹${product.price}</div>
        <button class="addCart">Add To Cart</button>
      `;

      listProductHTML.appendChild(newProduct);
    });
  }
};

// ------------------------
// Click Add to Cart
// ------------------------
if (listProductHTML) {
  listProductHTML.addEventListener("click", (event) => {
    if (event.target.classList.contains("addCart")) {
      let id_product = event.target.parentElement.dataset.id;
      addToCart(id_product);
    }
  });
}

// ------------------------
// Add to Cart
// ------------------------
const addToCart = (product_id) => {
  let index = cart.findIndex((item) => item.product_id == product_id);

  if (index < 0) {
    cart.push({ product_id: product_id, quantity: 1 });
  } else {
    cart[index].quantity += 1;
  }

  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ------------------------
// Display Cart in HTML
// ------------------------
const addCartToHTML = () => {
  if (!listCartHTML) return;

  listCartHTML.innerHTML = "";
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;

    let productInfo = products.find((p) => p.id == item.product_id);
    if (!productInfo) return;

    let newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.dataset.id = item.product_id;

    newItem.innerHTML = `
      <div class="image">
        <img src="${productInfo.image}" alt="">
      </div>
      <div class="name">${productInfo.name}</div>
      <div class="totalPrice">₹${productInfo.price * item.quantity}</div>
      <div class="quantity">
        <span class="minus"><</span>
        <span>${item.quantity}</span>
        <span class="plus">></span>
      </div>
    `;

    listCartHTML.appendChild(newItem);
  });

  if (iconCartSpan) iconCartSpan.innerText = totalQuantity;
};

// ------------------------
// Change Quantity in Cart
// ------------------------
if (listCartHTML) {
  listCartHTML.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("minus") ||
      event.target.classList.contains("plus")
    ) {
      let product_id =
        event.target.parentElement.parentElement.dataset.id;
      let type = event.target.classList.contains("plus")
        ? "plus"
        : "minus";

      changeQuantityCart(product_id, type);
    }
  });
}

const changeQuantityCart = (product_id, type) => {
  let index = cart.findIndex((item) => item.product_id == product_id);

  if (index >= 0) {
    if (type === "plus") {
      cart[index].quantity += 1;
    } else {
      cart[index].quantity -= 1;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }
  }

  addCartToHTML();
  addCartToMemory();
};

// ------------------------
// INIT APP
// ------------------------
const initApp = () => {
  fetch("products.json") // Make sure file in same folder
    .then((res) => res.json())
    .then((data) => {
      products = data;
      addDataToHTML();

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    })
    .catch((err) => console.error("Error loading products.json", err));
};

initApp();
