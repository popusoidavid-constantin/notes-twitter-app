export const handleTokenExpiration = (token) => {
  if (!token) {
    return false;
  }

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      localStorage.removeItem("token");
      return false;
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const payload = JSON.parse(window.atob(base64));

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      console.log("Token has expired, removing from localStorage");
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Invalid token format:", error);
    localStorage.removeItem("token");
    return false;
  }
};

export const checkResponseForExpiredToken = (response) => {
  if (response.status === 401) {
    console.log("Token has expired (401 response), removing from localStorage");
    localStorage.removeItem("token");
    return true;
  }
  return false;
};

export const handleAuthError = (error) => {
  if (error?.message?.includes("expired") || error?.message?.includes("invalid token") || error?.error?.includes("expired") || error?.error?.includes("unauthorized")) {
    console.log("Token has expired (error message), removing from localStorage");
    localStorage.removeItem("token");
    return true;
  }
  return false;
};
