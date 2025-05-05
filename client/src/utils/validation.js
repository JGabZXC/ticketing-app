export function validateUsername(username) {
  if (username.trim() === "") return "Username is required";
  return null;
}

export function validatePassword(password) {
  if (password.trim() === "") return "Password is required";
  return null;
}

export function validateRegisteredUsername(username) {
  if (username.trim() === "") return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters long";
  if (username.length > 20)
    return "Username must be at most 20 characters long";
  return null;
}

export function validateRegisteredEmail(email) {
  if (email === "") return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address";
  return null;
}

export function validateRegisteredFirstName(firstName) {
  if (firstName.trim() === "") return "First name is required";
  if (!/^[a-zA-Z]+$/.test(firstName)) return "Invalid first name";
  return null;
}

export function validateRegisteredLastName(lastName) {
  if (lastName.trim() === "") return "Last name is required";
  if (!/^[a-zA-Z]+$/.test(lastName)) return "Invalid last name";
  return null;
}

export function validateRegisteredPassword(password) {
  if (password.trim() === "") return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return null;
}

export function validateRegisteredConfirmPassword(password, confirmPassword) {
  if (confirmPassword.trim() === "") return "Confirm Password is required";
  if (confirmPassword !== password) return "Passwords do not match";
  return null;
}
