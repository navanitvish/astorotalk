// src/api/apiCalls.js
import axiosInstance from "./axiosInstance";
import { endpoints } from "./ApiEndpoint";



export const fetchHoroscope = async () => {
  const sign = "leo"; // Replace with dynamic sign if needed
  const response = await axiosInstance.post(
    `${endpoints.getHoroscope}?sign=${sign}` // Append the sign as a query parameter
  );
  return response.data;
};


// Fetch gemstones
export const fetchGemstones = async () => {
  const response = await axiosInstance.get(endpoints.getGemstones);
  return response.data; // Ensure this matches the API response structure
};

// Get Comments
export const fetchastrologers = async () => {
  const response = await axiosInstance.get(endpoints.getastrologers);
  return response.data;
};

export const fetchBlogs = async ({ limit = 10, page = 1 }) => {
  const response = await axiosInstance.get(endpoints.getBlogs, {
    params: { limit, page }, // Pass query parameters here
  });
  return response.data;
};


export const fetchTopRatedAstrologers = async () => {
  const response = await axiosInstance.get(endpoints.getTopRatedAstrologers);
  return response.data; // Ensure this matches the API response structure

};


// Fetch top-rated astrologers
export const fetchTopAstrologers = async () => {
  const response = await axiosInstance.get(endpoints.fetchTopAstrologers);
  return response.data; // Ensure this matches the API response structure
};



// Send sign-in email OTP request
export const requestEmailOTP = async ({ email }) => {
  // Retrieve the FCM token from localStorage
  const fcmToken = localStorage.getItem("FCM Token");  // Use the correct key

  console.log("FCM Token:", fcmToken);

  const response = await axiosInstance.post(endpoints.signIn, {
    email,
    fcm: fcmToken || "", // Use a fallback if FCM token is not available
  });

  return response.data;
};

// Verify OTP
export const verifyOTP = async ({ email, otp }) => {
  const response = await axiosInstance.post(endpoints.verifyOtp, {
    email,
    otp
  });
  return response.data;
};



// Fetch Blogs by Category
export const fetchBlogsByCategory = async ({ categoryName }) => {
  const response = await axiosInstance.get(
    `${endpoints.getBlogsByCategory}/${categoryName}`
  );
  return response.data;
};

// Fetch Recent Blogs
export const fetchRecentBlogs = async () => {
  const response = await axiosInstance.get(endpoints.getRecentBlogs);
  return response.data;
};


export const fetchPanchang = async () => {
  const latitude = 10.214747;
  const longitude = 78.097626;
  const ayanamsa = 1;
  const language = "en";

  try {
    const response = await axiosInstance.post(
      `${endpoints.getPanchang}?latitude=${latitude}&longitude=${longitude}&ayanamsa=${ayanamsa}&language=${language}`, // No body needed, so pass `null`    
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Panchang data:", error);
    throw error;
  }
};


export const addEnquiry = async (enquiryData) => {
  try {
    // Make the POST request using axios
    const response = await axiosInstance.post(endpoints.addEnquiry, enquiryData);

    // Return the response data
    return response.data;
  } catch (error) {
    // Log the error and throw it for handling in the mutation's onError callback
    console.error("Error adding enquiry:", error);
    throw new Error("There was an error submitting the enquiry. Please try again.");
  }
};

//postGemstone
export const postGemstone = async (postGemstoneuery) => {
  try {
    // Make the POST request using axios
    const response = await axiosInstance.post(endpoints.postGemstone, postGemstoneuery);

    // Return the response data
    return response.data;
  } catch (error) {
    // Log the error and throw it for handling in the mutation's onError callback
    console.error("Error adding postGemstoneuery:", error);
    throw new Error("There was an error submitting the postGemstoneuery. Please try again.");
  }
};

export const getPlans = async () => {
  try {
    const response = await axiosInstance.get(endpoints.plane); // Ensure `plane` is correctly defined in `endpoints`
    return response.data; // Extract the relevant data from the response
  } catch (error) {
    console.error("Error fetching plans:", error.message || error);
    throw new Error("Failed to fetch plans. Please try again later.");
  }
};

///api/notifications/get-all-notifications
export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get(endpoints.notifications); // Ensure `plane` is correctly defined in `endpoints`
    return response.data; // Extract the relevant data from the response
  } catch (error) {
    console.error("Error fetching plans:", error.message || error);
    throw new Error("Failed to fetch plans. Please try again later.");
  }
};