document.addEventListener("DOMContentLoaded", () => {
  const key = "theme";
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const label = btn.querySelector(".toggle-label");

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    btn.setAttribute("aria-checked", isDark ? "true" : "false");
    if (label) label.textContent = isDark ? "Light mode" : "Dark mode";
  }

  const saved = localStorage.getItem(key);
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved || (systemDark ? "dark" : "light"));

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(key, next);
    apply(next);
  });
});
