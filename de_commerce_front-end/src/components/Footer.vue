<template>
  <div class="newsletter-section">
    <div class="newsletter-content">
      <p class="newsletter-title">Want to stay in touch? Sign up to receive news and updates from the Jirani Merchants team.</p>
      <div class="newsletter-form">
        <input type="email" placeholder="Email Address" class="newsletter-input-field" />
        <button class="newsletter-signup-btn">SIGN UP</button>
      </div>
      <p class="newsletter-privacy">We respect your privacy.</p>
    </div>
  </div>
  <footer class="business-footer" v-show="isFooterVisible">
    <div class="footer-bottom-content">
      <ul class="footer-links-row">
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Cookie Policy</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div class="footer-logo-wrapper">
        <span class="footer-logo">M</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      isFooterVisible: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.checkScrollPosition);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkScrollPosition);
  },
  methods: {
    checkScrollPosition() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      this.isFooterVisible = scrollPosition >= documentHeight;
    },
  },
};
</script>

<style scoped>
.business-footer {
  background: var(--footer-bg);
  color: var(--footer-text);
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.18);
  padding: 0;
  font-family: "Montserrat", sans-serif;
}

/* Use page palette and fonts */
  :root {
    --footer-bg: #191919;
    --footer-text: #fcfffc;
    --footer-accent: #f15025;
    --footer-link-hover: #f15025;
  }

  .newsletter-section {
    background: #636973;
    color: var(--footer-text);
    padding: 60px 0 30px 0;
    text-align: center;
    margin: 11.5rem 0;
    font-family: "Montserrat", sans-serif;
  }

  .newsletter-title {
    font-family: "Montserrat", sans-serif;
    font-size: 1.2rem;
    margin-bottom: 30px;
    letter-spacing: 1px;
  }
  .newsletter-form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    margin-bottom: 18px;
  }
  .newsletter-input-field {
    padding: 18px 32px;
    font-size: 1.1rem;
    border: none;
    border-radius: 0;
    background: var(--footer-text);
    color: #636973;
    font-family: "Montserrat", sans-serif;
    width: 320px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .newsletter-signup-btn {
    padding: 18px 32px;
    font-size: 1.1rem;
    border: none;
    border-radius: 0;
    background: var(--footer-accent);
    color: var(--footer-text);
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: background 0.3s, color 0.3s;
  }
  .newsletter-signup-btn:hover {
    background: var(--footer-bg);
    color: var(--footer-accent);
  }
  .newsletter-privacy {
    font-size: 1rem;
    opacity: 0.7;
    margin-top: 18px;
    font-family: "Montserrat", sans-serif;
  }

  /* Black footer bar stuck at bottom */
  .business-footer {
    background: var(--footer-bg);
    color: var(--footer-text);
    width: 100vw;
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 10;
    box-shadow: 0 -2px 16px rgba(0,0,0,0.18);
    padding: 0;
    font-family: "Montserrat", sans-serif;
  }
  .footer-bottom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 0 18px 0;
  }
  .footer-links-row {
    display: flex;
    justify-content: center;
    gap: 48px;
    list-style: none;
    margin: 0 0 18px 0;
    padding: 0;
  }
  .footer-links-row li a {
    color: var(--footer-text);
    font-family: "Montserrat", sans-serif;
    font-size: 1.1rem;
    text-decoration: underline;
    opacity: 0.9;
    transition: color 0.3s, opacity 0.3s;
  }
  .footer-links-row li a:hover {
    color: var(--footer-link-hover);
    opacity: 1;
  }
  .footer-logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
  }
  .footer-logo {
    display: inline-block;
    font-family: "Montserrat", sans-serif;
    font-size: 3.2rem;
    color: var(--footer-accent);
    background: var(--footer-text);
    border-radius: 50%;
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-weight: 900;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  @media (max-width: 992px) {
    .footer-links-row {
      gap: 24px;
    }
    .newsletter-input-field, .newsletter-signup-btn {
      padding: 12px 18px;
      font-size: 1rem;
      width: 180px;
    }
  }

  @media (max-width: 576px) {
    .footer-links-row {
      flex-direction: column;
      gap: 8px;
    }
    .footer-logo {
      font-size: 2.2rem;
      width: 44px;
      height: 44px;
      line-height: 44px;
    }
    .newsletter-section {
      padding: 32px 0 18px 0;
    }
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