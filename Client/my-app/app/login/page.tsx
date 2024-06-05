"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  function login() {
    axios
      .post("http://localhost:4000/api/auth/login", {
        username: username,
        password: password,
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
    <div id="sign">
      <div>
        <div>
          <div>
            <form autoComplete="off">
              <h4>
                We are <span>HERE</span>
              </h4>
              <p>Welcome! Login to view today's products:</p>
              <div className="floating-label">
                <input
                  placeholder="username"
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="floating-label">
                <input
                  placeholder="email"
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="floating-label">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
              </div>
            </form>
            <button
              className="login-button"
              onClick={() => {
                login();
                router.push("/");
              }}
            >
              Login
            </button>
            <button
              className="signup-button"
              onClick={() => {
                router.push("/login");
              }}
            >
              Sign Up
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
