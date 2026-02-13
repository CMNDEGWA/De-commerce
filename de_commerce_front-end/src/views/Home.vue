<template>
  <div class="home">
    <header class="hero">
      <div class="hero-main-content">
        <div class="hero-image-wrapper">
          <img src="../assets/img/Home.png" alt="Shopping" class="hero-img" />
        </div>

        <router-link to="/login" class="get-started-btn">
          Get Started
        </router-link>

        <h1 class="hero-title">Elevate Your <br/> Shopping Experience</h1>
      </div>

      <p class="hero-subtitle">
        Discover a world of unique goods and services designed just for you.
      </p>
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
      <div class="element-box" @mouseover="highlight('Unmatched Quality')">
        <h2>Unmatched Quality</h2>
        <p>Access a curated selection of top-quality products.</p>
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

:root {
  --text-color: #eeba0b;
  --extra-color: #198754;
  --paragraph-color: #f0f0f0;
  --background-color: #062726;
  
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
  padding-top: 15vh; 
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* --- THE TOP ROW LAYOUT --- */
.hero-main-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.hero-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.hero-img {
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  border: 2px solid var(--text-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.hero-title {
  flex: 1;
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-color);
  text-align: right;
  letter-spacing: 2px;
  line-height: 1.1;
}

/* --- THE BUTTON (Matches Navbar Active Link) --- */
.get-started-btn {
  padding: 18px 35px;
  background-color: var(--text-color);
  color: var(--background-color);
  text-decoration: none;
  border-radius: 50px; /* Pill shape */
  font-weight: 800;
  font-size: 1.2rem;
  box-shadow: 0 5px 20px rgba(238, 186, 11, 0.4);
  transition: all 0.3s ease;
  white-space: nowrap;
  z-index: 2;
}

.get-started-btn:hover {
  transform: scale(1.05) translateY(-3px);
  box-shadow: 0 8px 25px rgba(238, 186, 11, 0.6);
  background-color: #fff; /* Slight pop on hover */
}

/* --- THE SUBTITLE --- */
.hero-subtitle {
  font-size: 1.4rem;
  max-width: 800px;
  margin: 4rem 0;
  color: var(--paragraph-color);
  opacity: 0.9;
}

/* Adjusting your existing elements to fit the dark theme */
.elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 5rem 0;
}

.element-box {
  border: 1px solid rgba(238, 186, 11, 0.2);
  border-radius: 15px;
  padding: 30px;
  transition: all 0.4s ease;
}

.element-box h2 {
  color: var(--text-color);
  margin-bottom: 15px;
}

.element-box:hover {
  background: var(--text-color);
  transform: translateY(-10px);
}

.element-box:hover h2, .element-box:hover p {
  color: var(--background-color);
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
  border-bottom: 1px solid rgba(238, 186, 11, 0.2);
  padding: 42px;
  margin-bottom: 2rem;
}

/* Mobile Responsiveness */
@media (max-width: 992px) {
  .hero-main-content {
    flex-direction: column;
    text-align: center;
  }
  .hero-title, .hero-image-wrapper {
    text-align: center;
  }
  .get-started-btn {
    order: 3; /* Move button below image and text on small screens */
  }
}
</style>