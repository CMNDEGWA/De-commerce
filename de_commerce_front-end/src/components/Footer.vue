<template>
  <footer class="business-footer">
    <div class="container footer-content">
      <div class="footer-section brand-info">
        <router-link to="/" class="brandName">Jirani Merchants</router-link>
        <p class="brand-description">
          Empowering local commerce with a curated selection of premium products and seamless shopping experiences.
        </p>
        <div class="social-links">
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Company</h4>
        <ul class="footer-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/products">Products</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Support</h4>
        <ul class="footer-links">
          <li><router-link to="/faq">FAQs</router-link></li>
          <li><router-link to="/shipping">Shipping Info</router-link></li>
          <li><router-link to="/returns">Returns</router-link></li>
          <li><router-link to="/privacy">Privacy Policy</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Newsletter</h4>
        <p class="newsletter-text">Stay updated on our latest arrivals.</p>
        <div class="newsletter-input">
          <input type="email" placeholder="Email address" />
          <button type="button"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container d-flex justify-content-between align-items-center">
        <p>&copy; 2026 Jirani Merchants. All Rights Reserved.</p>
        <p>Made with <i class="fas fa-heart text-danger"></i> for the community.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.business-footer {
  /* Using new palette (depth-focused) */
  --text-color: #191919;
  --background-color: #fcfffc;
  --navbar-bg: rgba(252, 255, 252, 0.9); /* Slightly more opaque for readability */
  
  background-color: var(--navbar-bg);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  
  /* Mirroring Navbar: Top Border and Upward Shadow */
  border-top: 3px solid var(--text-color);
  box-shadow: 0 -8px 25px rgba(0, 0, 0, 0.5);
  
  padding-top: 60px;
  margin-top: 50px;
  color: #f0f0f0;
  font-family: "Newsreader", serif;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 40px;
}

/* Brand Section Styling */
.brandName {
  display: block;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
  color: var(--text-color);
  text-decoration: none;
  letter-spacing: 4px;
  margin-bottom: 15px;
}

.brand-description {
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-heading {
  font-family: "Montserrat", sans-serif;
  color: var(--text-color);
  font-weight: 700;
  margin-bottom: 25px;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Links Styling */
.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #f0f0f0;
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: 0.75;
}

.footer-links a:hover {
  color: var(--text-color);
  opacity: 1;
  padding-left: 8px; /* Subtle slide effect */
}

/* Socials & Input */
.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(146, 20, 12, 0.06);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--text-color);
  color: var(--background-color);
  transform: translateY(-5px);
}

.newsletter-input {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px;
  border-radius: 12px;
  border: 1px solid rgba(146, 20, 12, 0.16);
}

.newsletter-input input {
  background: transparent;
  border: none;
  color: white;
  padding: 10px;
  flex: 1;
  outline: none;
}

.newsletter-input button {
  background: var(--text-color);
  border: none;
  color: var(--background-color);
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.newsletter-input button:hover {
  background: #fff;
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(146, 20, 12, 0.06);
  padding: 25px 0;
  font-size: 0.85rem;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .social-links {
    justify-content: center;
  }
  .footer-links a:hover {
    padding-left: 0;
  }
}
</style>