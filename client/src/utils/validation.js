export function validateUsername(username) {
  if (username.trim() === "") return "Username is required";
  return null;
}

export function validatePassword(password) {
  if (password.trim() === "") return "Password is required";
  return null;
}
