"use client";

import React, { useState } from "react";
import styles from "./CommentForm.module.css";

interface CommentFormProps {
  blogSlug: string;
  onCommentAdded: (comment: { user: string; comment: string }) => void;
}

export default function CommentForm({
  blogSlug,
  onCommentAdded,
}: CommentFormProps) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.trim() || !comment.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: blogSlug,
          user: user.trim(),
          comment: comment.trim(),
        }),
      });

      if (response.ok) {
        // Pass the comment data to the parent component
        onCommentAdded({ user: user.trim(), comment: comment.trim() });
        setUser("");
        setComment("");
        alert("Comment added successfully!");
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.commentForm}>
      <h3 className={styles.commentFormTitle}>Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Your name..."
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={styles.nameInput}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.inputGroup}>
          <textarea
            placeholder="Add your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.commentTextarea}
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Send ▲"}
        </button>
      </form>
    </div>
  );
}
