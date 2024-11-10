"use client";

import { useState } from "react";
import styles from "../page.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.png";

const Header = ({ logoSrc = logo, showSlideshow, onLogoClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Actors");

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownItemClick = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };

  return (
    <div className={styles.page}>
      <nav className={styles.navigation}>
        <Link href="/" onClick={onLogoClick} className={styles.logoContainer}>
          <Image className={styles.logo} src={logoSrc} alt="Logo" width={300} height={100} />
        </Link>
        <div className={styles.signContainer}>
          <button type="button">
            <Link className={styles.sign} href="/signinsignup">
              sign in
            </Link>
            <FontAwesomeIcon icon={faRightToBracket} color="#ccc" size="lg" />
          </button>
          <button type="button">
            <Link className={styles.sign} href="/signinsignup">
              sign up
            </Link>
            <FontAwesomeIcon icon={faUserPlus} color="#ccc" size="lg" />
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        {showSlideshow && (
          <div className={styles.slideshow}> {/* Placeholder for the slideshow */}
            {/* Slideshow Component logic can be passed here */}
          </div>
        )}
        <div className={styles.input}>
          <input
            type="text"
            placeholder={`Search by ${selectedItem}`}
            className={styles.searchInput}
          />
          <button className={styles.searchButton} type="button" onClick={toggleDropdown}>
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
          <Link href="/" className={styles.popLinks}>
            happy;
          </Link>
          <Link href="/" className={styles.popLinks}>
            sad;
          </Link>
          <Link href="/" className={styles.popLinks}>
            angry;
          </Link>
          <Link href="/" className={styles.popLinks}>
            funny;
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Header;
