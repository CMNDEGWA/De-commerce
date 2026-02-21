<template>
  <div class="home">
    <header class="hero">
      <div class="hero-main-content">
        <div class="hero-image-wrapper">
          <div class="hero-content">
            <h1 class="hero-title">Karibu<br/> Kwa Jirani, The Merchants.</h1>
            <p class="hero-lead"><em>Jirani:</em> It is a Swahili word meaining Neighbor.</p>
          </div>
          <img src="../assets/img/Merchants.jpg" alt="Shopping" class="hero-img" />
            <div class="cta-wrapper">
              <button class="get-started-btn">GET STARTED</button>
              <div class="login-prompt">
                <span>Already have an account?</span>
                <router-link to="/login" class="login-link">Login</router-link>
              </div>
            </div>
          </div>
      </div>
    </header>

    <section class="elements">
      <div class="element-box" @mouseover="highlight('Enhanced Experience')">
        <h2>Enhanced Experience</h2>
        <p>Shop effortlessly with our intuitive interface.</p>
      </div>
      <div class="element-box" @mouseover="highlight('Exclusive Offers')">
        <h2>Exclusive Offers</h2>
        <p>Unlock special discounts and promotions tailored to you.</p>
      </div>
      <div class="element-box" @mouseover="highlight('Real-Time Support')">
        <h2>Real-Time Support</h2>
        <p>Instant assistance when you need it most.</p>
      </div>
    </section>

    <section class="featured-products">
      <h1>Most Featured Products</h1>
      <!-- Placeholder for featured products, can be replaced with actual product components -->
      <div class="featured-box">
        <h2>Featured Product 1</h2>
        <img src="" alt="">
        <p>Discover the best of our collection with this top-rated item.</p>
            <router-link class="nav-link" to="/products">
               <i class="fas fa-arrow-right me-2"></i>View Product</router-link>
      </div>
      <div class="featured-box">
        <h2>Featured Product 2</h2>
        <img src="" alt="">
        <p>Experience excellence with this highly sought-after product.</p>
            <router-link class="nav-link" to="/products">
               <i class="fas fa-arrow-right me-2"></i>View Product</router-link>
      </div>
      <div class="featured-box">
        <h2>Featured Product 3</h2>
        <img src="" alt="">
        <p>Indulge in luxury with this exclusive and popular choice.</p>
            <router-link class="nav-link" to="/products">
               <i class="fas fa-arrow-right me-2"></i>View Product</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    highlight(feature) {
      alert(`Highlighting: ${feature}`);  // Placeholder for interactive feature
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
:root {
  --text-color: #191919;
  --extra-color: #f15025;
  --paragraph-color: #191919;
  --background-color: #fcfffc;
  
}

.home {
  background-color: var(--background-color);
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
  color: var(--paragraph-color);
  padding: 0 5%;
}

.hero {
  /* Offset for the sticky navbar (12vh - 15vh) */
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-content {
  margin: 1.4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.hero-lead {
  margin: 2rem 0;
  color: var(--paragraph-color);
  background-color: var(--extra-color);
  padding: 2rem;
  font-size: 1.08rem;
  font-weight: 400;
  text-align: center;
  max-width: 85%;
}

/* --- THE TOP ROW LAYOUT --- */
.hero-main-content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
}

/* image wrapper now holds overlay (title + button) */
.hero-image-wrapper {
  flex: 1;
  display: block;
  position: relative;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

.hero-img {
  width: 100%;
  height: auto;
  border-top: 2px solid var(--text-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  display: block;
}

/* Title sits near the top-right of the image */
.hero-title {
  font-family: "Jersey 10", sans-serif;
  font-weight: 800;
  pointer-events: auto;
  margin: 2rem 0;
  font-size:4.2rem;
  color: var(--text-color);
  text-align: right;
  letter-spacing: 2px;
  line-height: 1.1;
  align-self: center;
  text-shadow: 0 6px 18px rgba(0,0,0,0.35);
}

/* Button anchored bottom-center of the image */
.get-started-btn {
  pointer-events: auto;
  padding: 1.4rem 7.2rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 800;
  font-size: 1.4rem;
  background: var(--background-color);
  border-radius: 0;
  transition: all 0.5s ease;
  position: absolute;
  bottom: -35px;
  right: 0;
  border: 1.4px solid var(--text-color);
}

/* --- The descriptive text that should appear under the image --- */
.hero-span {
  display: block;
  text-align: right;
  font-weight: 400;
  font-size: 1.02rem;
  color: var(--paragraph-color);
  margin: 0; /* spacing handled by .hero-overlay-top gap */
  opacity: 0.95;
}

.hero-span em {
  color: var(--extra-color);
  font-style: normal;
  font-weight: 500;
}

.hero-span .hero-span-br {
  margin: 0.7rem 0;
}

/* Login link below Get Started button */

.cta-wrapper {
  font-family: "Jersey 10", sans-serif;
  font-size: 1.4rem;

}

.login-prompt {
  margin-top: 18px;
  text-align: left;
}

.login-link {
  padding: 0.5em 1.4em;
  margin: 0 0.5rem;
  border: 1.4px solid var(--extra-color);
  color: var(--extra-color);
  font-weight: 600;
  transition: color 0.7s ease, background-color 0.7s ease;
}
.login-link:hover {
  color: var(--text-color);
  background-color: var(--extra-color);
}

/* Adjusting your existing elements to fit the layout changes */
.elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 5rem 0;
  height: 36vh;
}

.element-box {
  border: 1px solid rgba(241, 80, 37, 0.10);
  border-radius: 0;
  padding: 3rem 2rem;
  transition: all 0.7s ease;
  background-color: var(--paragraph-color);
}

.element-box:hover {
  background: var(--background-color);
  transform: translateY(-10px);
}

.element-box h2 {
  font-family: "Jersey 10", sans-serif;
  color: var(--background-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.element-box p {
  font-family: "Montserrat", sans-serif;
  color: var(--background-color);
  font-size: 1.02rem;
  line-height: 1.5;
}

.element-box:hover h2, .element-box:hover p {
  color: var(--background-color);
  color: var(--text-color);
}

.featured-products {
  text-align: center;
  margin-top: 14rem;
}

.featured-products h1 {
  color: var(--paragraph-color);
  margin-bottom: 3rem;
}

.featured-products .featured-box {
  border-bottom: 1px solid rgba(241, 80, 37, 0.10);
  padding: 42px;
  margin-bottom: 2rem;
}

/* Mobile Responsiveness */
@media (max-width: 992px) {
  .hero-main-content {
    flex-direction: column;
    text-align: center;
  }
  .hero-image-wrapper {
    max-width: 720px;
  }
  .hero-title {
    align-self: center;
    text-align: center;
    font-size: 2.2rem;
  }
  .get-started-btn {
    position: static;
    transform: none;
    left: auto;
    bottom: auto;
    z-index: auto;
    align-self: center;
    margin-bottom: 18px;
  }
  .get-started-btn {
    order: 3; /* fallback if needed */
  }
  .hero-overlay-top {
    position: static;
    transform: none;
    right: auto;
    max-width: 100%;
    align-items: center;
    gap: 12px;
  }
}
</style>