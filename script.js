
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const loginForm = document.getElementById('loginForm');

    if (username === "user" && password === "pass") {
        loginForm.style.display = 'none';
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
}



let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartBox = document.getElementById("cart");

// بروزرسانی سبد هنگام لود صفحه
updateCartUI();

document.querySelectorAll(".buy-button").forEach(button => {
  button.addEventListener("click", function () {
    const product = this.closest(".product");
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    alert(`${name} به سبد خرید افزوده شد.`);
  });
});

function updateCartUI() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} (${item.quantity}) - ${item.price.toLocaleString()} تومان`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `جمع کل: ${total.toLocaleString()} تومان`;
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
  if (confirm("آیا مطمئن هستید که می‌خواهید سبد را خالی کنید؟")) {
    cart = [];
    saveCart();
    updateCartUI();
  }
}

function toggleCart() {
  cartBox.style.display = cartBox.style.display === "none" || cartBox.style.display === "" ? "block" : "none";
}
