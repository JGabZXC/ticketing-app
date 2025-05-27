export const clearAuthStorage = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
  localStorage.removeItem("reauth");
};
