"use client";

import { useState } from "react";
import styles from "../page.module.css"
import Link from "next/link";
import Image from "next/image";
import logo from '/public/logo.png';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      console.log("Sign In", { email, password });

    } else {
      console.log("Sign Up", { email, password, confirmPassword });

    }
  };


  const handleLogoClick = () => {
    setShowSlideshow(false);
  };

  return (
    <div className={styles.page}>
      <nav className={styles.navigation}>
        <Link href="/" className={styles.logo} onClick={handleLogoClick}>
          <Image src={logo} alt="Logo" width={300} height={100} />
        </Link>
        <div className={styles.sign}>
          <Link className={styles.sign} href="/signinsignup">sign in</Link>
          <Link className={styles.sign} href="/signinsignup">sign up</Link>
        </div>
      </nav>
      <div className={styles.signDescrip}>
        <p>
          
        </p>
      </div>
      <div className={styles.authContainer}>
        <h2>{isSignIn ? "sign in" : "sign up"}</h2>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isSignIn && (
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <br />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit">{isSignIn ? "Sign In" : "Sign Up"}</button>
          <p onClick={() => setIsSignIn((prev) => !prev)} className={styles.toggle}>
            {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
