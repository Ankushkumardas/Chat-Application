import axios from "axios";

export const getAccessToken = () => localStorage.getItem("accessToken");
export const setAccessToken = (token) => localStorage.setItem("accessToken", token);

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// ================= REQUEST INTERCEPTOR =================
// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     const token = getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ================= RESPONSE INTERCEPTOR =================
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     console.log(error.config, error.response);
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axiosInstance.post("/auth/refresh-token");

//         const newAccessToken = res.data.accessToken;
//         setAccessToken(newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return axiosInstance(originalRequest); // retry
//       } catch (err) {
//         // Refresh token expired → force logout
//         localStorage.removeItem("accessToken");
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
