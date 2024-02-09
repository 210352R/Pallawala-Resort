import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

console.log("Access Token:", accessToken);
console.log("Refresh Token:", refreshToken);

// // Function to generate a new access token using the refresh token
// const generateAccessToken = async (refreshToken) => {
//   // Implement your logic to generate a new access token using the refresh token
// };

// Create Axios instance with default headers
const axiosInstance = axios.create({
  //   baseURL: "http://your_api_base_url",
  headers: {
    "Content-Type": "application/json",
    authorization: `${accessToken}`,
    "refresh-token": `${refreshToken}`,
  },
});

// Add a response interceptor to save access token to local storage
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response contains a token
    if (response.data?.token) {
      console.log("Wade wenawa ----------------- ");
      console.log("New access token:", response.data?.token);
      // Save the token to local storage
      localStorage.setItem("accessToken", response.data?.token);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
