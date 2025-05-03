export const getUserInfo = async (token) => {
  if (token) {
    try {
      const response = await fetch("/api/profile/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user data");
        return;
      }

      const data = await response.json();
      return data.user;
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }
};
