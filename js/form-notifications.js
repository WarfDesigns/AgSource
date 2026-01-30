document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".contact-form");

    forms.forEach((form) => {
        const notice = form.querySelector(".form-submit-notice");
        if (!notice) {
            return;
        }

        form.addEventListener("submit", (event) => {
            if (form.dataset.submitting === "true") {
                return;
            }

            form.dataset.submitting = "true";
            event.preventDefault();
            notice.classList.add("is-visible");
            notice.setAttribute("aria-hidden", "false");

            const submitButton = form.querySelector("[type=\"submit\"]");
            if (submitButton) {
                submitButton.disabled = true;
            }

            window.setTimeout(() => {
                form.submit();
            }, 1200);
        });
    });
});