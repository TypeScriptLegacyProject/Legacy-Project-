"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import "../styles/register.css";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("seller");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  function register() {
    axios
      .post("http://localhost:4000/api/auth/register", {
        username: username,
        password: password,
        role: role,
        email: email,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div id="register-sign">
      <div className="register-form-container">
        <h4>Welcome Newcomer!</h4>
        <p>Join our community and enjoy exclusive member benefits!</p>
        <div className="register-input-group">
          <input
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            className="register-input-field"
          />
        </div>
        <div className="register-input-group">
          <input
            placeholder="Email"
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            className="register-input-field"
          />
        </div>
        <div className="register-input-group">
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            className="register-input-field"
          />
        </div>
        <div className="register-input-group register-dropdown-wrapper">
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="register-dropdown-field"
          >
            <option value="seller">Seller</option>
            <option value="user">Buyer</option>
          </select>
        </div>
        <button
          className="register-signup-button"
          onClick={(e: React.FormEvent) => {
            register();
            e.preventDefault();
            router.push("/login");
          }}
        >
          Sign up
        </button>
        {message && <p>{message}</p>}
        <p className="register-login-text">
          You already have an account? <a href="/login" className="register-login-link">Log in</a>
        </p>
      </div>
      <div className="register-image-container"></div>
    </div>
  );
}
