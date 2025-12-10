import React from "react";
import styles from "./page.module.css";
import { getProjects } from "@/database/projectSchema";
import Button from "@/components/ui/Button";
import CommentSection from "@/components/ui/CommentSection";
import { getCommentsByBlogSlug } from "@/database/commentSchema";

export default async function Portfolio() {
  // Fetch projects from database
  const projects = await getProjects();
  // Use a fixed slug to associate comments with the portfolio page
  const portfolioSlug = "portfolio";
  const comments = await getCommentsByBlogSlug(portfolioSlug);

  // Handle null case if no projects found
  if (!projects) {
    return (
      <div className={styles.portfolioContainer}>
        <h1>My Projects</h1>
        <p>No projects found at the moment. Check back soon!</p>
      </div>
    );
  }
  return (
    <div className={styles.portfolioContainer}>
      <h1>My Projects</h1>
      {/* Two Column Layout matching blog post page */}
      <div className={styles.twoColumnLayout}>
        {/* Left Column - Comments Section */}
        <div className={styles.leftColumn}>
          <CommentSection comments={comments || []} blogSlug={portfolioSlug} />
        </div>

        {/* Right Column - Portfolio Content */}
        <div className={styles.rightColumn}>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className={styles.projectImage}
                />
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDate}>{project.date}</p>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.projectTechnologies}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.projectTechnology}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  {project.githubUrl && (
                    <Button href={project.githubUrl}>GitHub</Button>
                  )}
                  {project.liveUrl && (
                    <Button href={project.liveUrl}>Live Demo</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
