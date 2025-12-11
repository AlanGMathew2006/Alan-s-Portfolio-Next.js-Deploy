import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { getBlogs } from "@/database/blogSchema";
import Button from "@/components/ui/Button";

export default async function Blog() {
  const blogs = await getBlogs();

  if (!blogs || blogs.length === 0) {
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
        {blogs.map((blog) => {
          const raw = blog?.image ?? "";
          const alt = blog?.imageAlt ?? "Blog image";
          const isRemote = /^https?:\/\//i.test(raw);

          // Normalize local image paths to /images/... (served from public/)
          let src = raw.startsWith("/") ? raw : `/${raw}`;
          if (!isRemote) {
            if (!src.startsWith("/images/")) {
              src = src.replace(/^\/public\//, "/");
              src = `/images/${src.replace(/^\//, "")}`;
            }
          }

          return (
            <div key={blog.slug} className={styles.blogCard}>
              <div className={styles.blogContent}>
                <h2 className={styles.blogTitle}>{blog.title}</h2>
                <p className={styles.blogDate}>{blog.date}</p>
                {raw ? (
                  <Image
                    src={src}
                    alt={alt}
                    className={styles.blogImage}
                    width={800}
                    height={450}
                    sizes="(max-width: 800px) 100vw, 800px"
                    priority={false}
                    unoptimized={!isRemote}
                  />
                ) : (
                  <div className={styles.blogImage} aria-hidden="true" />
                )}
                <p className={styles.blogDescription}>{blog.description}</p>
                <div className={styles.blogLinks}>
                  <Button href={`/blog/${blog.slug}`}>Read More</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
