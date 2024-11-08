"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css"; 
import logo from '/public/logo.png'; 
import Image from "next/image";

const slides = [
  { id: 1, image: "/crew1.jpg" },
  { id: 2, image: "/crew2.webp" },
  { id: 3, image: "/crew3.jpg" },
];

const Slideshow = ({ onLogoClick }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slideshow}>
      <div 
        className={styles.slide} 
        style={{ backgroundImage: `url(${slides[currentSlideIndex].image})` }}
        onClick={onLogoClick} 
      >
       
        <div className={styles.caption}>{slides[currentSlideIndex].caption}</div>
      </div>
    </div>
  );
};

export default Slideshow;
