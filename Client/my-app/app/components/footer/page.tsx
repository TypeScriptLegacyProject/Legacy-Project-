"use client";

import "../../styles/footer.css";

function Footer() {
  return (
    <div className="azerty" >
    <footer className="footer">
  <div className="footer-section">
    <h3>Exclusive</h3>
    <p>Subscribe to get 10% off your first order</p>
    <input type="email" placeholder="Enter your email" />
  </div>
  <div className="footer-section">
    <h3>Support</h3>
    <p>111 , Ariana, TN 24, Tunisie.</p>
    <p>exclusive@gmail.com</p>
    <p>+99-999-999</p>
  </div>
  <div className="footer-section">
    <h3>Account</h3>
    <p>
      <a href="/editProfil">My Account</a>
    </p>
    <p>
      <a href="/login">Login / Register</a>
    </p>
    <p>
      <a href="/cart">Cart</a>
    </p>
    <p>
      <a href="#">Wishlist</a>
    </p>
    <p>
      <a href="/home">Shop</a>
    </p>
  </div>
  <div className="footer-section">
    <h3>Quick Link</h3>
    <p>
      <a href="#">Privacy Policy</a>
    </p>
    <p>
      <a href="#">Terms Of Use</a>
    </p>
    <p>
      <a href="#">FAQ</a>
    </p>
    <p>
      <a href="/contact">Contact</a>
    </p>
  </div>
  <div className="footer-section">
    <h3>Download App</h3>
    <p>Save $3 with App New User Only</p>
    <div className="app-links">
      <a href="#">
        <img src="../src/images/googlePlay.png" alt="Google Play" />
      </a>
      <a href="#">
        <img src="../src/images/appStore.png" alt="App Store" />
      </a>
    </div>
  </div>
  <div className="social-media">
    <a href="#">Facebook</a>
    <a href="#">Twitter</a>
    <a href="#">Instagram</a>
    <a href="#">LinkedIn</a>
  </div>
  <div className="copyright">
    &copy; Copyright 2024. All right reserved
  </div>
</footer>
</div>
  );
}

export default Footer;
