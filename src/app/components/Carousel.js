"use client";

import { useState } from "react";
import styles from "../page.module.css";

const VideoCarousel = () => {
  const videos = [
    { id: 1, src: "https://www.example.com/video1.mp4", title: "Video 1" },
    { id: 2, src: "https://www.example.com/video2.mp4", title: "Video 2" },
    { id: 3, src: "https://www.example.com/video3.mp4", title: "Video 3" },
    { id: 4, src: "https://www.example.com/video4.mp4", title: "Video 4" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + videos.length) % videos.length
    );
  };

  return (
    <div className={styles.carousel}>
      <button onClick={prevVideo} className={styles.prevButton}>❮</button>
      <div className={styles.videoContainer}>
        <video
          className={styles.video}
          controls
          src={videos[currentIndex].src}
          title={videos[currentIndex].title}
          autoPlay
          loop
        />
      </div>
      <button onClick={nextVideo} className={styles.nextButton}>❯</button>
      <div className={styles.videoTitle}>{videos[currentIndex].title}</div>
    </div>
  );
};

export default VideoCarousel;
