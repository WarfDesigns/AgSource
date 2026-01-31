//This function loads a template from a given URL and inserts it into an element with the specified ID
function loadTemplate(url, elementId) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then(data => {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = data;
        if (elementId === "main-nav") {
          if (typeof window.initThemeToggle === "function") {
            window.initThemeToggle();
          }
          if (typeof window.initNavToggle === "function") {
            window.initNavToggle();
          }
        }
      } else {        if (elementId === "footer") {
          const yearSpan = element.querySelector("#year");
          if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
          }
        }
        console.warn(`Element with ID "${elementId}" not found.`);
      }
    })
    .catch(error => console.error('Error loading template:', error));
}

// Load templates when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadTemplate('/templates/menu.html', 'main-nav');
  loadTemplate('/templates/footer.html', 'footer');
  loadTemplate('/templates/header.html', 'header');
  loadTemplate('/templates/reviews.html', 'reviews');
  loadTemplate('/templates/top-bar.html', 'top-bar');
});

//Add copyright year to footer
document.getElementById('year').textContent = new Date().getFullYear();