/**
 * Cart drawer UI: renders cart contents, handles open/close and checkout.
 */
import { MENU_ITEMS } from "../data/menu.js";
import { subscribe, setQuantity, removeItem, clearCart, itemCount } from "../store.js";
import { formatPrice } from "../utils/format.js";
import { showToast } from "./toast.js";

const itemById = new Map(MENU_ITEMS.map((i) => [i.id, i]));

export function initCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  const toggleBtn = document.getElementById("cart-toggle");
  const closeBtn = document.getElementById("cart-close");
  const checkoutBtn = document.getElementById("checkout-btn");

  toggleBtn.addEventListener("click", () => openCart());
  closeBtn.addEventListener("click", () => closeCart());
  overlay.addEventListener("click", () => closeCart());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  checkoutBtn.addEventListener("click", () => {
    clearCart();
    closeCart();
    showToast("Order placed! Your coffee will be ready soon. ☕");
  });

  subscribe(render);

  function openCart() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    overlay.hidden = false;
  }

  function closeCart() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    overlay.hidden = true;
  }
}

function render(cart) {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");

  list.innerHTML = "";
  let total = 0;

  if (cart.size === 0) {
    const empty = document.createElement("li");
    empty.className = "cart-empty";
    empty.textContent = "Your cart is empty. Add something tasty!";
    list.appendChild(empty);
  }

  for (const [id, qty] of cart) {
    const item = itemById.get(id);
    if (!item) continue;
    total += item.price * qty;
    list.appendChild(createRow(item, qty));
  }

  totalEl.textContent = formatPrice(total);
  countEl.textContent = String(itemCount());
  checkoutBtn.disabled = cart.size === 0;
}

function createRow(item, qty) {
  const li = document.createElement("li");
  li.className = "cart-item";

  const info = document.createElement("div");
  info.className = "cart-item-info";

  const name = document.createElement("span");
  name.className = "cart-item-name";
  name.textContent = `${item.emoji} ${item.name}`;

  const price = document.createElement("span");
  price.className = "cart-item-price";
  price.textContent = formatPrice(item.price * qty);

  info.append(name, price);

  const controls = document.createElement("div");
  controls.className = "cart-item-controls";

  const minus = qtyButton("−", `Decrease quantity of ${item.name}`, () =>
    setQuantity(item.id, qty - 1)
  );
  const count = document.createElement("span");
  count.className = "cart-item-qty";
  count.textContent = String(qty);
  const plus = qtyButton("+", `Increase quantity of ${item.name}`, () =>
    setQuantity(item.id, qty + 1)
  );
  const remove = qtyButton("🗑", `Remove ${item.name} from cart`, () =>
    removeItem(item.id)
  );
  remove.classList.add("cart-item-remove");

  controls.append(minus, count, plus, remove);
  li.append(info, controls);
  return li;
}

function qtyButton(label, ariaLabel, onClick) {
  const btn = document.createElement("button");
  btn.className = "icon-button";
  btn.textContent = label;
  btn.setAttribute("aria-label", ariaLabel);
  btn.addEventListener("click", onClick);
  return btn;
}
