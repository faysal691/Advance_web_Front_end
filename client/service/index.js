import {baseUrl } from "../const";
import axios from 'axios';

export const jsxService = () =>
axios.create({
    baseURL: baseUrl,
  });
  export const apiService = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // Include credentials for session authentication
    validateStatus: function (status) {
      // Handle unauthenticated status codes (401, 403)
      if (status === 401 || status === 403) {
        // Redirect to the login page
        // make a 500ms delay to allow the user to see the error message
        setTimeout(() => {
          window.location.href = `/auth/login`;
        }
        , 2000);
        return false; // Prevent the promise chain from continuing
      }
      return status >= 200 && status < 300; // Default behavior for other status codes
    },
  });
