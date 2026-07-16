/**
 * Brew Haven — app entry point.
 */
import { initMenu } from "./ui/menu.js";
import { initCart } from "./ui/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initCart();
});
