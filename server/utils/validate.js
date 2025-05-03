export function validateComment(comment) {
  if (!comment.trim()) return "No comment provided";
  if (comment.length < 5) return "Comment is too short";
  if (comment.length > 500) return "Comment is too long";

  return null;
}
