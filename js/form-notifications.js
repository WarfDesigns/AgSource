document.addEventListener("DOMContentLoaded", () => {
    const successMessage = "Thanks for reaching out! We’re glad to walk the field with you—our team will be in touch soon.";
    const forms = document.querySelectorAll(".contact-form");
    const modal = createSuccessModal(successMessage);

    forms.forEach((form) => {
        const notice = form.querySelector(".form-submit-notice");

        form.addEventListener("submit", async (event) => {
            if (form.dataset.submitting === "true") {
                return;
            }

            form.dataset.submitting = "true";
            event.preventDefault();
            if (notice) {
                notice.classList.remove("is-visible");
                notice.setAttribute("aria-hidden", "true");
                notice.textContent = "";
            }

            const submitButton = form.querySelector("[type=\"submit\"]");
            if (submitButton) {
                submitButton.disabled = true;
            }

            try {
                const response = await fetch(form.action, {
                    method: form.method || "POST",
                    body: new FormData(form),
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                    },
                });

                if (!response.ok) {
                    throw new Error("Unable to send your message right now.");
                }

                form.reset();
                openSuccessModal(modal);
            } catch (error) {
                if (notice) {
                    notice.textContent = "We could not send your message at this time. Please try again later.";
                    notice.classList.add("is-visible");
                    notice.setAttribute("aria-hidden", "false");
                }
            } finally {
                form.dataset.submitting = "false";
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    });
});

function createSuccessModal(message) {
    const modal = document.createElement("div");
    modal.className = "form-success-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="form-success-modal__backdrop" data-modal-close="true"></div>
        <div class="form-success-modal__content" role="document">
            <p class="form-success-modal__message">${message}</p>
            <button type="button" class="btn btn-primary" data-modal-close="true">Close</button>
        </div>
    `;

    modal.addEventListener("click", (event) => {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }

        if (event.target.dataset.modalClose === "true") {
            closeSuccessModal(modal);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSuccessModal(modal);
        }
    });

    document.body.appendChild(modal);
    return modal;
}

function openSuccessModal(modal) {
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
}

function closeSuccessModal(modal) {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
}