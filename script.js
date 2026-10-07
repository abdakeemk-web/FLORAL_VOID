// ===== PRELOADER =====
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("fade-out");
  setTimeout(() => loader.style.display = "none", 800);
});

// ===== IMAGE SLIDER =====
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.style.opacity = '0');
  slides[index].style.opacity = '1';
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(0);  // Show first slide
setInterval(nextSlide, 5000);  // Change slide every 5 seconds

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: "smooth"
      });
    }
  });
});

// ===== SCROLL REVEAL EFFECT =====
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run on load

// ===== CONTACT FORM POPUP =====
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    // Show custom popup
    const popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.innerHTML = `
      <div class="popup-box">
        <h3>Thank You!</h3>
        <p>Your message has been sent successfully.</p>
        <button id="closePopup">OK</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("closePopup").addEventListener("click", () => {
      popup.classList.add("fade-out");
      setTimeout(() => popup.remove(), 500);
    });

    form.reset();
  });
}
