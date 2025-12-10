import React from "react";
import styles from "./page.module.css";
import { getBlogs } from "@/database/blogSchema";
import Button from "@/components/ui/Button";

export default async function Blog() {
  // Fetch blogs from database
  const blogs = await getBlogs();

  // Handle null case if no blogs found
  if (!blogs) {
    return (
      <div className={styles.blogContainer}>
        <h1>My Blog</h1>
        <p>No blogs found at the moment. Check back soon!</p>
      </div>
    );
  }
  return (
    <div className={styles.blogContainer}>
      <h1>My Blog</h1>
      <div className={styles.blogsGrid}>
        {blogs.map((blog) => (
          <div key={blog.slug} className={styles.blogCard}>
            <div className={styles.blogContent}>
              <h2 className={styles.blogTitle}>{blog.title}</h2>
              <p className={styles.blogDate}>{blog.date}</p>
              <img
                src={blog.image}
                alt={blog.imageAlt}
                className={styles.blogImage}
              />
              <p className={styles.blogDescription}>{blog.description}</p>
              <div className={styles.blogLinks}>
                <Button href={`/blog/${blog.slug}`}>Read More</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
