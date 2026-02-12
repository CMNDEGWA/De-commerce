<template>
  <section id="home" class="section-content bg-app-black">
    <div class="container home-container">
      <h1 class="text-center">
        Welcome to <span class="span">De-commerce</span>
      </h1>
      <p class="home-text">
        Discover a curated selection of products, seamless shopping, and a secure experience—
        all with the style and clarity you expect.
      </p>
      <h2 class="text-start choose-engineer-title">
        Why Shop With Us? <i class="fa-solid fa-arrow-turn-down"></i>
      </h2>
      <div class="choose-engineer-text">
        <p>
          <span class="span">
            <i class="fas fa-cogs me-2"></i>
            Wide Selection:
          </span> <br>
          From tech gadgets to lifestyle essentials, our catalog is always growing with quality in mind.
        </p>
        <p>
          <span class="span">
            <i class="fas fa-shield-alt me-2"></i>
            Secure Shopping:
          </span> <br>
          Shop confidently with robust security and privacy for every transaction.
        </p>
        <p>
          <span class="span">
            <i class="fas fa-lightbulb me-2"></i>
            Fast Support:
          </span> <br>
          Our team is ready to help—before, during, and after your purchase.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed for static home
</script>

<style scoped>
#home {
  padding: 0;
}
.home-container {
  padding: 0;
}
#home h1 {
  font-size: 2.1rem;
  color: var(--text-color);
  margin: 2.1rem 0;
  letter-spacing: 2px;
  text-decoration: underline;
  text-underline-offset: 14px;
}
#home .choose-engineer-title {
  font-size: 1.4rem;
  color: var(--text-color);
  margin: 2.1rem 0;
  letter-spacing: 2px;
  text-decoration: underline;
  text-underline-offset: 14px;
}
#home .set-apart-title {
  font-size: 1.4rem;
  color: var(--text-color);
  margin-top: 4.9rem;
  padding-bottom: 7px;
  letter-spacing: 2px;
  text-decoration: underline;
  text-underline-offset: 14px;
}
#home .set-apart-title-2 {
  margin-bottom: 4.9rem;
  font-size: 1rem;
  font-weight: 400;
  color: var(--extra-color);
  font-family: "Savate", sans-serif;
}
#home .home-text {
  font-size: 1.2rem;
  color: var(--paragraph-color);
  margin: 4.9rem 0;
  line-height: 1.6;
}
#home .span {
  color: var(--extra-color);
  font-family: 'Savate', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
}
#home .span .fas {
  color: var(--extra-color);
  font-size: 1.2rem;
  margin-bottom: 42px;
}
</style>
