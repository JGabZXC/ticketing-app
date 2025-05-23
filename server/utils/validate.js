export function validateComment(comment) {
  if (!comment.trim()) return "No comment provided";
  if (comment.length < 5) return "Comment is too short";
  if (comment.length > 500) return "Comment is too long";

  return null;
}

export function validateUsername(username = "") {
  if (!username.trim()) return "No username provided";
  if (username.length < 3) return "Username is too short";
  if (username.length > 20) return "Username is too long";

  return null;
}

export function validateEmail(email = "") {
  if (!email.trim()) return "No email provided";
  if (email.length < 5) return "Email is too short";
  if (email.length > 50) return "Email is too long";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Invalid email format";

  return null;
}

export function validateFirstName(firstName = "") {
  if (!firstName.trim()) return "No first name provided";
  if (firstName.length < 2) return "First name is too short";
  if (firstName.length > 20) return "First name is too long";

  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(firstName)) return "Invalid first name format";

  return null;
}

export function validateLastName(lastName = "") {
  if (!lastName.trim()) return "No last name provided";
  if (lastName.length < 2) return "Last name is too short";
  if (lastName.length > 20) return "Last name is too long";

  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(lastName)) return "Invalid last name format";

  return null;
}

export function validatePassword(password = "") {
  if (!password.trim()) return "No password provided";
  if (password.length < 8) return "Password is too short";
  if (password.length > 20) return "Password is too long";

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!regex.test(password))
    return "Invalid password format, must contain at least one uppercase letter, one lowercase letter, and one number";

  return null;
}

export function validateConfirmPassword(password = "", confirmPassword = "") {
  if (!confirmPassword.trim()) return "No confirm password provided";
  if (confirmPassword.length < 8) return "Confirm password is too short";
  if (confirmPassword.length > 20) return "Confirm password is too long";

  if (password !== confirmPassword)
    return "Password and confirm password do not match";

  return null;
}
