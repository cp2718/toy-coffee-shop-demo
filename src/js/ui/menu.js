/**
 * Menu rendering: category filters + product grid.
 */
import { CATEGORIES, MENU_ITEMS } from "../data/menu.js";
import { addItem } from "../store.js";
import { formatPrice } from "../utils/format.js";
import { showToast } from "./toast.js";

let activeCategory = "All";

export function initMenu() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const el = document.getElementById("menu-filters");
  el.innerHTML = "";
  for (const cat of CATEGORIES) {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(cat === activeCategory));
    btn.addEventListener("click", () => {
      activeCategory = cat;
      renderFilters();
      renderGrid();
    });
    el.appendChild(btn);
  }
}

function renderGrid() {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = "";
  const items =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === activeCategory);

  for (const item of items) {
    grid.appendChild(createCard(item));
  }
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "menu-card";

  const icon = document.createElement("div");
  icon.className = "menu-card-icon";
  icon.textContent = item.emoji;
  icon.setAttribute("aria-hidden", "true");

  const name = document.createElement("h3");
  name.textContent = item.name;

  const desc = document.createElement("p");
  desc.className = "menu-card-desc";
  desc.textContent = item.description;

  const footer = document.createElement("div");
  footer.className = "menu-card-footer";

  const price = document.createElement("span");
  price.className = "menu-card-price";
  price.textContent = formatPrice(item.price);

  const addBtn = document.createElement("button");
  addBtn.className = "btn btn-small";
  addBtn.textContent = "Add to Order";
  addBtn.addEventListener("click", () => {
    addItem(item.id);
    showToast(`${item.name} added to your order`);
  });

  footer.append(price, addBtn);
  card.append(icon, name, desc, footer);
  return card;
}
