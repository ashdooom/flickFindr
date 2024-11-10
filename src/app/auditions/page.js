"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.png";
import Hamburger from "hamburger-react";
import Header from "../components/Header";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [selectedItem, setSelectedItem] = useState("Actors");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogoClick = () => {
    setShowSlideshow(false);
  };

  const handleDropdownItemClick = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() !== "") {
      const newComment = { id: Date.now(), text: commentInput, rating: 0 };
      setCommentInput("");
    }
  };

  return (
    <div className={styles.page}>
      <nav className={styles.navigation}>
        <h1>flickFindr</h1>
        <Link href="/" onClick={handleLogoClick} className={styles.logoContainer}>
          <Image className={styles.logo} src={logo} alt="Logo" width={300} height={100} />
        </Link>
        <div className={styles.hamburgerContainer}>
          <Hamburger toggled={hamburgerOpen} toggle={setHamburgerOpen} />
        </div>

        <div className={hamburgerOpen ? styles.navMenuMobile : styles.signContainer}>
          <button type="button">
            <Link className={styles.sign} href="/signinsignup">sign in</Link>
            <FontAwesomeIcon icon={faRightToBracket} color="#ccc" size="lg" />
          </button>
          <button type="button">
            <Link className={styles.sign} href="/signinsignup">sign up</Link>
            <FontAwesomeIcon icon={faUserPlus} color="#ccc" size="lg" />
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        
          <>
            <div className={styles.input}>
              <input
                type="text"
                placeholder={`Search by ${selectedItem}`}
                className={styles.searchInput}
              />
              <button
                className={styles.searchButton}
                type="button"
                onClick={toggleDropdown}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} color="#ccc" size="lg" />
              </button>
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  {["Actors", "Crew", "Directors", "Scripts"].map((item) => (
                    <div
                      key={item}
                      className={styles.dropdownItem}
                      onClick={() => handleDropdownItemClick(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.pop}>popular searches..</div>
            <div className={styles.popLinks}>
              <Link href="/" className={styles.popLinks}>happy;</Link>
              <Link href="/" className={styles.popLinks}>sad;</Link>
              <Link href="/" className={styles.popLinks}>angry;</Link>
              <Link href="/" className={styles.popLinks}>funny;</Link>
            </div>
          </>
      </main>
    </div>
  );
}
