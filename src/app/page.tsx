import React from "react";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className={styles["about-content"]}>
      <div className={styles.left}>
        <h3>Hello, I'm</h3>
        <h1>Alan Mathew</h1>
        <h3>Web Developer & Designer</h3>
        <p>
          Welcome to my personal website! I'm passionate about creating
          beautiful and functional web experiences. Involved in Hack4Impact, a
          non-profit organization focused on providing tech solutions for social
          good. Feel free to explore my work!
        </p>
        <Button href="/portfolio">View My Portfolio</Button>
      </div>
      <div className={styles.right}>
        <img
          src="/images/home-page.png"
          alt="Alan Mathew"
          width="350"
          height="525"
        />
      </div>
    </div>
  );
}
