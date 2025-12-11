import React from "react";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/database/blogSchema";
import { getCommentsByBlogSlug } from "@/database/commentSchema";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import CommentSection from "@/components/ui/CommentSection";
import Image from "next/image";

// Force dynamic rendering to always fetch fresh data including comments
export const dynamic = "force-dynamic";
export const revalidate = 0; // Always revalidate

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  // Fetch comments from separate Comment collection
  const comments = await getCommentsByBlogSlug(blog.slug);

  return (
    <div className={styles.blogPostContainer}>
      {/* Two Column Layout */}
      <div className={styles.twoColumnLayout}>
        {/* Left Column - Comments Section */}
        <div className={styles.leftColumn}>
          <CommentSection comments={comments || []} blogSlug={blog.slug} />
        </div>

        {/* Right Column - Blog Content */}
        <div className={styles.rightColumn}>
          <article className={styles.blogPost}>
            <header className={styles.blogHeader}>
              <h1 className={styles.blogTitle}>{blog.title}</h1>
              <p className={styles.blogDate}>{blog.date}</p>
              {(() => {
                const raw = blog?.image ?? "";
                const alt = blog?.imageAlt ?? "Blog image";
                const isRemote = /^https?:\/\//i.test(raw);
                let src = raw.startsWith("/") ? raw : `/${raw}`;
                if (!isRemote) {
                  if (!src.startsWith("/images/")) {
                    src = src.replace(/^\/public\//, "/");
                    src = `/images/${src.replace(/^\//, "")}`;
                  }
                }
                return raw ? (
                  <Image
                    src={src}
                    alt={alt}
                    className={styles.blogHeroImage}
                    width={800}
                    height={400}
                    sizes="(max-width: 800px) 100vw, 800px"
                    priority
                    unoptimized={!isRemote}
                  />
                ) : (
                  <div className={styles.blogHeroImage} aria-hidden="true" />
                );
              })()}
            </header>

            <div className={styles.blogContent}>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            <footer className={styles.blogFooter}>
              <Button href="/blog">← Back to Blog</Button>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = await getBlogs();
  if (!blogs) return [];

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
} // Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blog.title} | Alan Mathew`,
    description: blog.description,
  };
}
