import { useState } from "react";
import styles from "../page.module.css"

const StarRating = ({ rating, setRating }) => {
  const stars = [1, 2, 3, 4, 5]; 

  return (
    <div className={styles.starRating}>
      {stars.map((star) => (
        <span
          key={star}
          className={`${styles.star} ${star <= rating ? styles.filled : ""}`}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
