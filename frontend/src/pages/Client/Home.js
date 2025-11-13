import React from "react";
import "../../styles/Home.css";
import farmBanner from "../../assets/farmer-banner.jpg"; // ✅ Correct relative import

function Home() {
  return (
    <div className="container">
      <div className="home-banner">
        <img
          src={farmBanner}
          alt="Fresh farm produce"
          className="home-banner-img"
        />
        <div className="home-banner-text">
          <h1>Welcome to Ruri Club!</h1>
          <p>Your source for the freshest local produce.</p>
          <button className="shop-btn" onClick={() => window.location.href='/shop'}>
            🛒 See Our New Arrivals!
          </button>
        </div>
      </div>

      <section className="home-content">
        <h2>About Ruri Club</h2>
        <p>
          Founded in 2024, Ruri Club started as a small initiative to connect
          local farmers directly with consumers. We believe in sustainable,
          community-driven agriculture that brings fresh produce right to your
          table.
        </p>

        <h2>Our Vision</h2>
        <p>
          We aim to build a thriving local food ecosystem by strengthening the
          bond between farmers and families, ensuring fair prices and reducing
          food waste.
        </p>
      </section>
    </div>
  );
}

export default Home;