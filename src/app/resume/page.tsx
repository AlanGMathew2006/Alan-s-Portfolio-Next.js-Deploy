import React from "react";
import styles from "./page.module.css";

export default function Resume() {
  return (
    <div className={styles.resumeContainer}>
      <header className={styles.resumeHeader}>
        <h1>Alan Mathew</h1>
        <div className={styles.contactInfo}>
          <p>Email: alangmathew@gmail.com | Phone: (916) 750-5525</p>
          <p>
            <a
              href="https://github.com/AlanGMathew2006"
              className={styles.githubLink}
            >
              GitHub
            </a>{" "}
            |
            <a
              href="https://www.linkedin.com/in/alan-mathew-6b14a7318"
              className={styles.linkedinLink}
            >
              {" "}
              LinkedIn
            </a>
          </p>
        </div>
        <div className={styles.downloadSection}>
          <a
            href="/resume.pdf"
            download="resume.pdf"
            className={styles.downloadButton}
          >
            📄 Download PDF Resume
          </a>
        </div>
      </header>

      <section className={styles.resumeSection}>
        <h2>Education</h2>
        <div className={styles.resumeItem}>
          <p className={styles.degree}>
            Bachelor of Science in Computer Science
          </p>
          <p>California Polytechnic State University, San Luis Obispo</p>
          <p className={styles.date}>Expected: May, 2029</p>
        </div>
      </section>

      <section className={styles.resumeSection}>
        <h2>Experience</h2>
        <div className={styles.resumeItem}>
          <h3>Web Developer</h3>
          <p className={styles.company}>Brilliant Consulting</p>
          <p className={styles.date}>Summer of 2025</p>
        </div>
      </section>

      <section className={styles.resumeSection}>
        <h2>Skills</h2>
        <div className={styles.resumeItem}>
          <ul>
            <li>HTML, CSS, JavaScript</li>
            <li>Python 3</li>
            <li>Node.js</li>
            <li>Nodemailer.js</li>
            <li>MongoDB</li>
            <li>Express.js</li>
            <li>React</li>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Git & GitHub</li>
          </ul>
        </div>
      </section>

      <section className={styles.resumeSection}>
        <h2>Projects</h2>
        <div className={styles.resumeItem}>
          <h3>Brilliant Consulting Web App</h3>
          <p>
            A comprehensive website for a tech consulting firm, featuring a
            Login/Signup system, appointment scheduler, payment gateway, and
            automated email notifications. Integrated user and admin dashboards
            for seamless management. Built with HTML, CSS, JavaScript, Node.js,
            Express.js, and MongoDB.
          </p>
        </div>
      </section>

      <section className={styles.resumeSection}>
        <h2>Activities</h2>
        <div className={styles.resumeItem}>
          <h3>Hack For Impact</h3>
          <p className={styles.position}>UI/UX Designer & Member</p>
          <p className={styles.date}>Fall 2025 - Present</p>
          <ul>
            <li>
              Design digital solutions for nonprofit organizations using Figma
            </li>
            <li>
              Collaborate with development teams on social impact projects
            </li>
            <li>Participate in weekly meetings and design workshops</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
