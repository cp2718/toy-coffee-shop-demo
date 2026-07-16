/**
 * Minimal cart store with pub/sub and localStorage persistence.
 */
const STORAGE_KEY = "brew-haven-cart";

const listeners = new Set();

/** @type {Map<string, number>} itemId -> quantity */
let cart = loadCart();

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const entries = JSON.parse(raw);
    if (!Array.isArray(entries)) return new Map();
    return new Map(entries.filter(([id, qty]) => typeof id === "string" && Number.isInteger(qty) && qty > 0));
  } catch {
    return new Map();
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...cart.entries()]));
  } catch {
    // Storage unavailable (private mode etc.) — cart still works in-memory.
  }
}

function notify() {
  persist();
  for (const fn of listeners) fn(getCart());
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(getCart());
  return () => listeners.delete(fn);
}

export function getCart() {
  return new Map(cart);
}

export function addItem(id, qty = 1) {
  cart.set(id, (cart.get(id) ?? 0) + qty);
  notify();
}

export function removeItem(id) {
  cart.delete(id);
  notify();
}

export function setQuantity(id, qty) {
  if (qty <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, qty);
  }
  notify();
}

export function clearCart() {
  cart.clear();
  notify();
}

export function itemCount() {
  let total = 0;
  for (const qty of cart.values()) total += qty;
  return total;
}
