import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.copyright}>
          © 2025 Alan Mathew. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
