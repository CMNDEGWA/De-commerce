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

    <section class="about-section">
      <h1 class="about-title">ABOUT US</h1>
      <div class="about-content">
        <div class="about-story">
          <h2>Our Story</h2>
          <p>
            Founded with a vision to empower communities and connect cultures, Jirani, The Merchants, began as a small initiative to bridge local talent with a global audience. Our journey is rooted in the belief that every product and service carries a story, a heritage, and a purpose. Over the years, we have grown into a vibrant marketplace that celebrates diversity, creativity, and sustainable growth.
          </p>
        </div>
        <div class="about-values">
          <h2>Our Values & Commitments</h2>
          <ul>
            <li><strong>Integrity:</strong> We operate with honesty, transparency, and respect for all.</li>
            <li><strong>Community:</strong> We foster a sense of belonging and uplift local entrepreneurs.</li>
            <li><strong>Innovation:</strong> We embrace creativity and technology to deliver exceptional experiences.</li>
            <li><strong>Sustainability:</strong> We are committed to eco-friendly practices and responsible sourcing.</li>
            <li><strong>Inclusivity:</strong> We celebrate diversity and ensure equal opportunities for all.</li>
          </ul>
        </div>
        <div class="about-features">
          <div class="about-feature-box">
            <h3>Mission</h3>
            <p>To empower local merchants and artisans by providing a platform that connects them to a global marketplace, fostering economic growth and cultural exchange.</p>
          </div>
          <div class="about-feature-box">
            <h3>Vision</h3>
            <p>To be a leading force in sustainable commerce, where every transaction supports communities and preserves cultural heritage, aligned with international standards and environmental stewardship.</p>
          </div>
          <div class="about-feature-box">
            <h3>Goals</h3>
            <ul>
              <li>Promote fair trade and ethical business practices worldwide.</li>
              <li>Expand opportunities for local businesses to reach international markets.</li>
              <li>Champion environmental responsibility in every aspect of our operations.</li>
              <li>Continuously innovate to enhance user experience and accessibility.</li>
            </ul>
          </div>
        </div>
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
  padding-bottom: 7rem;
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


/* About Us Section */
.about-section {
  color: var(--paragraph-color);
  padding: 6rem 0 4rem 0;
  margin-top: 8rem;
  border-radius: 0;
}

.about-title {
  font-family: "Jersey 10", sans-serif;
  font-size: 2.8rem;
  color: var(--extra-color);
  text-align: center;
  margin-bottom: 2.5rem;
  letter-spacing: 1.2px;
}

.about-content {
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.about-story, .about-values {
  background: var(--paragraph-color);
  color: var(--background-color);
  border-radius: 0;
  padding: 2.2rem 2.5rem;
  font-family: "Montserrat", sans-serif;
}

.about-story h2, .about-values h2 {
  font-family: "Jersey 10", sans-serif;
  color: var(--extra-color);
  border-left: 1.4px solid var(--extra-color);
  padding-left: 1.2rem;
  width: 30%;
  font-size: 2rem;
  margin-bottom: 1.2rem;
  letter-spacing: 1px;
}

.about-values ul {
  list-style: none;
  margin: 0;
  padding-left: 1.2em;
}

.about-values li {
  margin-bottom: 0.7em;
  font-size: 1.08rem;
  font-family: "Montserrat", sans-serif;
}

.about-values li strong {
  color: var(--extra-color);
  padding: 0 0.7rem;
}

.about-features {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: space-between;
  margin-top: 2.5rem;
}


.about-feature-box {
  flex: 1 1 260px;
  color: var(--paragraph-color);
  border: 1.2px solid var(--text-color);
  border-radius: 0;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 10px rgba(241,80,37,0.06);
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.about-feature-box:hover h3{
  color: var(--text-color);
  text-transform: uppercase;
}

.about-feature-box p {
  font-size: 1.02rem;
  line-height: 1.5;
  letter-spacing: 0.7px;
}

.about-feature-box h3 {
  font-family: "Jersey 10", sans-serif;
  color: var(--extra-color);
  font-size: 2rem;
  margin-bottom: 0.8rem;
  letter-spacing: 0.5px;
  transition: all 0.7s ease;
}

.about-feature-box ul {
  list-style: none;
  margin: 0 0.7rem;
  padding-left: 1.2em;
}

.about-feature-box li {
  margin-bottom: 0.5em;
  font-size: 1.01rem;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.7px;
}

@media (max-width: 992px) {
  .about-content {
    flex-direction: column;
    gap: 2rem;
    padding: 0 1.2rem;
  }
  .about-features {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .about-feature-box {
    max-width: 100%;
    min-width: 0;
    align-items: flex-start;
  }
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