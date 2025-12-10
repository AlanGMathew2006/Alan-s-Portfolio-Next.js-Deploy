"use client";

import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import styles from "./CommentSection.module.css";
import { Comment as CommentType } from "@/database/commentSchema";

interface CommentSectionProps {
  comments?: CommentType[];
  blogSlug: string;
}

export default function CommentSection({
  comments = [],
  blogSlug,
}: CommentSectionProps) {
  // Initialize local state with the comments from props
  const [localComments, setLocalComments] = useState<CommentType[]>(comments);

  const handleCommentAdded = (newComment: {
    user: string;
    comment: string;
  }) => {
    // Add the new comment to local state immediately
    const comment: CommentType = {
      user: newComment.user,
      comment: newComment.comment,
      time: new Date().toISOString(), // Convert to string for serialization
      blogSlug: blogSlug,
    };

    setLocalComments((prev) => [...prev, comment]);
  };

  return (
    <div className={styles.commentSection}>
      {/* Display existing comments */}
      {localComments && localComments.length > 0 && (
        <div className={styles.commentsContainer}>
          <h3 className={styles.commentsTitle}>
            {localComments.length} comment
            {localComments.length !== 1 ? "s" : ""}
          </h3>
          <div className={styles.commentsList}>
            {localComments.map((comment, index) => (
              <Comment
                key={`${index}-${comment.user}-${comment.time}`}
                comment={comment}
              />
            ))}
          </div>
        </div>
      )}

      {/* Comment form */}
      <CommentForm blogSlug={blogSlug} onCommentAdded={handleCommentAdded} />
    </div>
  );
}
