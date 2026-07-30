const themeButtons = document.querySelectorAll(".theme-btn");
const themeOverlay = document.getElementById("themeOverlay");
const themeOverlayBarFill = document.getElementById("themeOverlayBarFill");

function runJumpyProgress(fillElement) {
  return new Promise((resolve) => {
    let progress = 0;

    const step = () => {
      progress = Math.min(100, progress + 6 + Math.random() * 20);
      fillElement.style.width = `${progress}%`;

      if (progress < 100) {
        setTimeout(step, 110 + Math.random() * 260);
      } else {
        setTimeout(resolve, 350);
      }
    };

    setTimeout(step, 120 + Math.random() * 200);
  });
}

for (const button of themeButtons) {
  button.addEventListener("click", async () => {
    const theme = button.dataset.theme;
    if (button.classList.contains("active")) return;

    themeOverlayBarFill.style.transition = "none";
    themeOverlayBarFill.style.width = "0%";
    themeOverlay.classList.add("visible");
    void themeOverlayBarFill.offsetWidth;
    themeOverlayBarFill.style.transition = "";

    await runJumpyProgress(themeOverlayBarFill);

    document.documentElement.dataset.theme = theme;

    for (const otherButton of themeButtons) {
      otherButton.classList.toggle("active", otherButton === button);
    }

    themeOverlay.classList.remove("visible");
  });
}

const toggles = document.querySelectorAll(".card-toggle");

for (const button of toggles) {
  button.addEventListener("click", () => {
    const extra = button.nextElementSibling;
    const isOpen = extra.classList.toggle("open");

    button.textContent = isOpen
      ? "Okay, reicht. −"
      : "Was bringt das? +";
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    }
  },
  {
    threshold: 0.12,
  }
);

for (const element of document.querySelectorAll(".reveal")) {
  revealObserver.observe(element);
}

const cursor = document.querySelector(".cursor");

window.addEventListener("pointermove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

for (const element of document.querySelectorAll("a, button")) {
  element.addEventListener("mouseenter", () => {
    cursor.style.width = "42px";
    cursor.style.height = "42px";
  });

  element.addEventListener("mouseleave", () => {
    cursor.style.width = "16px";
    cursor.style.height = "16px";
  });
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = contactForm.querySelector("button[type=submit]");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formStatus.classList.remove("error");
  formStatus.textContent = "Wird gesendet …";
  submitButton.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      formStatus.textContent = "Angekommen. Wir melden uns.";
      contactForm.reset();
    } else {
      throw new Error(result.message || "Senden fehlgeschlagen.");
    }
  } catch (error) {
    formStatus.classList.add("error");
    formStatus.textContent =
      "Hat nicht geklappt. Schreib uns direkt an hello@dasgeil.studio.";
  } finally {
    submitButton.disabled = false;
  }
});
