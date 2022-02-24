import React from "react";
import styles from "../styles/card.module.css";

const Card = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <h3 className={styles.subtitle}>{subtitle}</h3>
    </div>
  );
};

export default Card;
