import styles from "./Comment.module.css";
import { Comment as CommentType } from "@/database/commentSchema";

type CommentProps = {
  comment: CommentType;
};

function parseCommentTime(time: Date | string) {
  const date = time instanceof Date ? time : new Date(time);
  return date.toLocaleDateString();
}

// Generate a random color for each user
function getUserColor(user: string) {
  const colors = [
    "#00d4aa",
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#f39c12",
    "#9b59b6",
  ];
  let hash = 0;
  for (let i = 0; i < user.length; i++) {
    hash = user.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function Comment({ comment }: CommentProps) {
  return (
    <div className={styles.comment}>
      <div className={styles.userAvatar}>
        {comment.user.charAt(0).toUpperCase()}
      </div>
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={styles.userName}>{comment.user}</span>
          <span className={styles.commentTime}>
            {parseCommentTime(comment.time)}
          </span>
        </div>
        <p className={styles.commentText}>{comment.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
