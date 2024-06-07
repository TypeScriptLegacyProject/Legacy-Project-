"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "../auth";
import "../styles/login.css";

export default function Login() {

  const { loginAction } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  

  const handleLogin = async (e:any) => {
    e.preventDefault();
    loginAction({ username: username, email: email, password: password });
    router.push("/")
  };


  

  return (
    <div id="sign">
      <div className="login-form-container">
        <h4>Welcome Back to Exclusive!</h4>
        <p>Login to your account and discover new exclusive deals!</p>
        <div className="login-floating-label">
          <input
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            className="login-input-field"
          />
        </div>
        <div className="login-floating-label">
          <input
            placeholder="email"
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            className="login-input-field"
          />
        </div>
        <div className="login-floating-label">
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            className="login-input-field"
          />
        </div>
        <div className="login-options">
          <label className="login-remember-me">
            <input type="checkbox" name="remember" /> Remember me
          </label>
          <a href="#" className="login-forgot-password">Forgot your password?</a>
        </div>
        <button
          className="login-login-button"
          onClick={(e) => {
            handleLogin(e)
           
          }}
        >
          Login
        </button>
        <a
          className="login-signup-link"
          onClick={() => {
            router.push("/register");
          }}
        >
          Create Account
        </a>
        {message && <p>{message}</p>}
      </div>
      <div className="login-image-container"></div>
    </div>
  );
}
