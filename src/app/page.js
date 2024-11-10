"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import VideoCarousel from "./components/Carousel";
import StarRating from "./components/Stars";
import Slideshow from "./components/Slideshow";
import Image from "next/image";
import logo from "/public/logo.png";
import { useSwipeable } from "react-swipeable";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(true);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [isLogoCentered, setIsLogoCentered] = useState(true);
  const [swiped, setSwiped] = useState(false);



  const [comments, setComments] = useState([
    { id: 1, text: "Awesome", rating: 0 },
    { id: 2, text: "Great", rating: 0 },
    { id: 3, text: "Fantastic", rating: 0 },
  ]);

  const [allComments, setAllComments] = useState([
    { id: 4, text: "Sick", rating: 0 },
    { id: 5, text: "Amazing", rating: 0 },
    { id: 6, text: "Riveting", rating: 0 },
    { id: 7, text: "So good", rating: 0 },
  ]);

  const [selectedItem, setSelectedItem] = useState("Actors");

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const nextComment = () => {
    setCurrentCommentIndex((prevIndex) =>
      (prevIndex + 1) % comments.length
    );
  };

  const prevComment = () => {
    setCurrentCommentIndex((prevIndex) =>
      (prevIndex - 1 + comments.length) % comments.length
    );
  };

  const updateRating = (id, rating) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, rating } : comment
      )
    );

    setAllComments((prevAllComments) =>
      prevAllComments.map((comment) =>
        comment.id === id ? { ...comment, rating } : comment
      )
    );
  };

  const handleLogoClick = () => {
    setShowSlideshow(false);
    setIsLogoCentered(false);
  };

  const handleDropdownItemClick = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() !== "") {
      const newComment = { id: Date.now(), text: commentInput, rating: 0 };
      setAllComments((prev) => [...prev, newComment]);
      setCommentInput("");
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setSwiped(true),
    onSwipedLeft: () => setSwiped(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className={styles.page}>
      <nav className={styles.navigation}>
        <Link href="/" onClick={handleLogoClick} className={styles.logoContainer}>
          <Image className={styles.logo} src={logo} alt="Logo" width={300} height={100} />
        </Link>
        <div className={styles.signContainer}>
          <button
            type="button"
          >
            <Link className={styles.sign} href="/signinsignup">sign in</Link>
            <FontAwesomeIcon icon={faRightToBracket} color="#ccc" size="lg" />
          </button>
          <button
            type="button">
            <Link className={styles.sign} href="/signinsignup">sign up</Link>
            <FontAwesomeIcon icon={faUserPlus} color="#ccc" size="lg" />
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        {showSlideshow ? (
          <Slideshow onLogoClick={handleLogoClick} />
        ) : (
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
            <div className={styles.trending}>🔥trending auditions🔥</div>
            <div className={styles.navColumn}>
              <div className={styles.navColumnTxt}>
                <h1 className={styles.flickFindr}>flickFindr</h1>
                <Link href="/">
                  <Image src={logo} className={styles.logoNav} />
                </Link>
                <Link href="/auditions">
                  <button className={styles.columnBtn}>
                    <h2>Auditions</h2>
                  </button>
                </Link>

                <button className={styles.columnBtn}>
                  <h2>Directors</h2>
                </button>
                <button className={styles.columnBtn}>
                  <h2>Scripts</h2>
                </button>
                <button className={styles.columnBtn}>
                  <h2>Film Crew</h2>
                </button>
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.carousel}>
                <VideoCarousel />
              </div>

              <div className={`${styles.contentWrapper} ${swiped ? styles.swiped : ""}`} {...swipeHandlers}>
                <div className={styles.commentsContainer}>
                  <h2 className={styles.top} style={{ textAlign: "center" }}>Top Comments</h2>
                  <div className={styles.comment}>
                    {comments[currentCommentIndex].text}
                    <StarRating
                      rating={comments[currentCommentIndex].rating}
                      setRating={(rating) => updateRating(comments[currentCommentIndex].id, rating)}
                      className={styles.starRating}
                    />
                  </div>
                </div>
                <div className={styles.navigation}>
                  <button onClick={prevComment} className={styles.navButton}>❮</button>
                  <button onClick={nextComment} className={styles.navButton}>❯</button>
                </div>
              </div>
            </div>

            <div className={styles.commentBox}>
              <h2 style={{ textAlign: "center", marginTop: "5vh" }}>Leave a Comment</h2>
              <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Write your comment here..."
                  className={styles.commentInput}
                  rows="4"
                />
                <button type="submit" className={styles.submitButton}>Submit</button>
              </form>
            </div>

            <div className={styles.allComments}>
              <h2 style={{ textAlign: "center" }}>All Comments</h2>
              {allComments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  {comment.text}
                  <StarRating
                    rating={comment.rating}
                    setRating={(rating) => updateRating(comment.id, rating)}
                    className={styles.starRating}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

    </div>
  );
}
