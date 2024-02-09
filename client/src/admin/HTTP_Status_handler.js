// Function to handle HTTP errors
export const handleHttpError = (error, action) => {
  const { status } = error.response || {};

  if (status === 401) {
    // Redirect to login page
    console.log("Unauthorized Access");
    action();
  } else if (status === 500) {
    // Handle 500 Internal Server Error (e.g., display an error message)
    console.error("Internal Server Error");
  }
};
