/**
 * Simple toast notifications.
 */
let hideTimer = null;

export function showToast(message, duration = 2500) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => toast.classList.remove("visible"), duration);
}
