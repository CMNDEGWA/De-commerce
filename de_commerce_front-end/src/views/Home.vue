<template>
  <div class="container">
  <div class="home">
    <header class="hero">
      <div class="hero-main-content">
        <div class="hero-image-wrapper">
          <div class="hero-content">
            <h1 class="hero-title">Karibu<br/> Kwa Jirani, Merchants.</h1>
            <p class="hero-lead">Connecting local makers and curious buyers — discover handcrafted goods, stories, and small businesses from your community.</p>
          </div>
          <img src="../assets/img/Home.png" alt="Shopping" class="hero-img" />
        </div>

      </div>
      <p class="hero-subtitle">
        When you dive into this world, you are not just a buyer. You are part of a community that appreciates 
        the hustle and creativity behind each unique offering. <br>
        Here, it is all about supporting local talent and living that vibrant life. <br>
        So, come through, explore, and allow yourself to be part of this remarkable 
        journey where every item and service resonates with the heartbeat of our culture. <br>
        Let's celebrate that uniqueness together, my friend!
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

    </div></div>
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
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.hero-lead {
  margin-top: 1rem;
  color: rgba(25,25,25,0.85);
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
  border-radius: 20px;
  border: 2px solid var(--text-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  display: block;
}

/* overlay sits above the image and provides depth + smooth placement */
.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  pointer-events: none; /* allow clicks to pass except on interactive elements */
  padding: 28px;
  gap: 12px;
}

.hero-overlay-top {
  position: absolute;
  top: 28px; /* place near the top-right of the image */
  right: 48px; /* nudge toward the right side of the image */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 36px; /* ensure hero-span sits 36px below hero-title */
  pointer-events: auto; /* allow interactions for inner text if needed */
  max-width: 55%; /* keep text readable and not overflow image */
}

/* Title sits near the top-right of the image */
.hero-title {
  pointer-events: auto;
  margin: 0;
  font-size: 3rem;
  font-weight: 800;
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
  padding: 12px 26px;
  border-bottom: 2px solid var(--text-color);
  color: var(--text-color);
  text-decoration: none;
  font-weight: 800;
  font-size: 1.05rem;
  background: rgba(255,255,255,0.85);
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(241,80,37,0.12);
  transition: all 0.5s ease;
  position: absolute;
  left: 50%;
  bottom: 28px; /* anchor to image bottom padding */
  transform: translateX(-50%);
  z-index: 5;
}

.get-started-btn:hover {
  background-color: var(--extra-color);
  color: var(--background-color);
  box-shadow: 0 12px 40px rgba(241,80,37,0.18);
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

/* --- THE SUBTITLE --- */
.hero-subtitle {
  font-size: 1.2rem;
  letter-spacing: 1.4px;
  font-weight: 300;
  color: var(--text-color);
  padding: 3rem 6rem;
  height: auto;
}

/* Adjusting your existing elements to fit the layout changes */
.elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 5rem 0;
}

.element-box {
  border: 1px solid rgba(241, 80, 37, 0.10);
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