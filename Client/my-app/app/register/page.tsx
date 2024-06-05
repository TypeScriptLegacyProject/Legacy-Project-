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
    <div className="container">
      <div className="signup-container">
        <div className="signup-form-wrapper">
          <form className="signup-form" autoComplete="off">
            <h4>
              We are <span>HERE</span>
            </h4>
            <p>Welcome! Sign up to view today's products:</p>
            <div className="input-group">
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
            <div className="input-group">
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
            <div className="input-group">
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
            <div className="input-group">
              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field dropdown-field"
              >
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
            <button
              className="signup-button"
              onClick={(e: React.FormEvent) => {
                register();
                e.preventDefault();
                router.push("/");
              }}
            >
              Sign up
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
