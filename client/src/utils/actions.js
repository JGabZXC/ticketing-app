export async function updateProfileAction(formData) {
  const { username, email, firstName, lastName } = Object.fromEntries(
    formData.entries()
  );

  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/users/me/update",
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, firstName, lastName }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile");
    }

    const data = await response.json();
    return {
      success: true,
      user: data.data.user,
      message: "Profile updated successfully",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
