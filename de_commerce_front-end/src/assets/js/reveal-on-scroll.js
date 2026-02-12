// Reveal on scroll effect (vanilla JS, to be imported in main.js)
export function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  for (const el of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }
}

export function setupRevealOnScroll() {
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
}
