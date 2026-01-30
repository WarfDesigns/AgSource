const themeStorageKey = "theme";

function getPreferredTheme() {
  const saved = localStorage.getItem(themeStorageKey);
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return systemDark ? "dark" : "light";
}

function applyTheme(theme, btn) {
  document.documentElement.setAttribute("data-theme", theme);
  if (!btn) return;

  const label = btn.querySelector(".toggle-label");
  const isDark = theme === "dark";
  btn.setAttribute("aria-checked", isDark ? "true" : "false");
  if (label) label.textContent = isDark ? "Dark mode" : "Light mode";
}

function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn || btn.dataset.themeBound === "true") return;

  btn.dataset.themeBound = "true";
  const current = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
  applyTheme(current, btn);

  btn.addEventListener("click", () => {
    const active = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = active === "dark" ? "light" : "dark";
    localStorage.setItem(themeStorageKey, next);
    applyTheme(next, btn);
  });
}

window.initThemeToggle = initThemeToggle;

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getPreferredTheme());
  initThemeToggle();
});