// scripts.js
// Add any interactive animations here
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 10px 20px rgba(0, 255, 204, 0.3)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "none";
      });
    });
  });
