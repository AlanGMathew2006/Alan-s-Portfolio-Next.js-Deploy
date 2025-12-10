import mongoose, { Schema } from "mongoose";
import connectDB from "./db";

export type Comment = {
  user: string;
  comment: string;
  time: Date | string;
  blogSlug: string;
};

// mongoose schema for comments
const commentSchema = new Schema<Comment>({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  time: { type: Date, required: true, default: Date.now },
  blogSlug: { type: String, required: true },
});

// defining the collection and model
const CommentModel =
  mongoose.models["comments"] || mongoose.model("comments", commentSchema);

export async function getCommentsByBlogSlug(
  blogSlug: string
): Promise<Comment[] | null> {
  await connectDB();

  try {
    const comments = await CommentModel.find({ blogSlug })
      .sort({ time: 1 })
      .lean();

    // Convert to plain objects to avoid serialization issues
    const plainComments: Comment[] = comments.map((comment) => ({
      user: comment.user,
      comment: comment.comment,
      time: comment.time,
      blogSlug: comment.blogSlug,
    }));

    return plainComments;
  } catch (err) {
    console.error("Error fetching comments:", err);
    return null;
  }
}

export async function addComment(commentData: {
  user: string;
  comment: string;
  blogSlug: string;
}): Promise<Comment | null> {
  await connectDB();

  try {
    const newComment = new CommentModel({
      user: commentData.user,
      comment: commentData.comment,
      blogSlug: commentData.blogSlug,
      time: new Date(),
    });

    const savedComment = await newComment.save();

    // Return plain object to avoid serialization issues
    const plainComment: Comment = {
      user: savedComment.user,
      comment: savedComment.comment,
      time: savedComment.time,
      blogSlug: savedComment.blogSlug,
    };

    return plainComment;
  } catch (err) {
    console.error("Error adding comment:", err);
    return null;
  }
}

export default CommentModel;
