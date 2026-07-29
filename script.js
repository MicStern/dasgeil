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

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent =
    "Sieht nach einem guten Projekt aus. Das Formular ist im Prototyp noch nicht mit einem Maildienst verbunden.";
});
