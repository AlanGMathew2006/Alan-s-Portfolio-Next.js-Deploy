import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLogo}>
          Alan Mathew
        </Link>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/portfolio" className={styles.navLink}>
            Portfolio
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <Link href="/resume" className={styles.navLink}>
            Resume
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
