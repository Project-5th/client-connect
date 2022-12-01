/* eslint-disable */

import { login } from "./login.js";
// import { login } from "./bundle.js";
import { buyPost } from "./stripe.js";
// const { buyPost } = require("./stripe");
const btn = document.getElementById("buyBtn");
const loginForm = document.getElementById("regForm");
console.log(btn);

if (btn) {
  btn.addEventListener("click", (e) => {
    console.log(btn);
    e.target.textContent = "Processing...";
    const { postId } = e.target.dataset;
    buyPost(postId);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    login(email, password);
  });
}
