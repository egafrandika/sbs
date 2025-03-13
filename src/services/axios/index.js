import axios from "axios";
import { useLoadingState } from "../../stores/data-load";
// import API_BASE_URL from './stages';

const token = localStorage.getItem('token')
//create axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        ...(token && {Authorization: `Bearer ${token}`}),
    },
});

// interceptor spin
apiClient.interceptors.request.use((config) => {
  const loadingStore = useLoadingState();
  loadingStore.startLoading()
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
      const loadingStore = useLoadingState();
      loadingStore.stopLoading(); // Stop loading spinner
      return response;
  },
  (error) => {
      const loadingStore = useLoadingState();
      loadingStore.stopLoading(); // Stop loading spinner even if there's an error
      return Promise.reject(error);
  }
);

// custom GET function
export const customGet = async (url) => {
    try {
        const response = await apiClient.get(url); //perform get request
        return response.data; //return the response data
    } catch(error) {
        console.error('Error during GET request:', error);
        throw error;
    }
};

// custom POST function
export const customPost = async (url, data) => {
    try {
        const response = await apiClient.post(url, data); //perform post request
        return response.data;
    } catch(error) {
        console.error('Error during POST request:', error)
        throw error;
    }
};

// custom PUT function
export const customPut = async (url, data) => {
    try {
      const response = await apiClient.put(url, data);  // Perform PUT request
      return response.data;  // Return the response data
    } catch (error) {
      console.error('Error during PUT request:', error);
      throw error;  // Propagate error
    }
};

// custom PATCH function
export const customPatch = async (url, data) => {
    try {
      const response = await apiClient.patch(url, data);  // Perform PATCH request
      return response.data;  // Return the response data
    } catch (error) {
      console.error('Error during PATCH request:', error);
      throw error;  // Propagate error
    }
};

// custom DELETE function
export const customDelete = async (url) => {
    try {
      const response = await apiClient.delete(url);  // Perform DELETE request
      return response.data;  // Return the response data
    } catch (error) {
      console.error('Error during DELETE request:', error);
      throw error;  // Propagate error
    }
};

export default {
    customGet,
    customPost,
    customPut,
    customPatch,
    customDelete,
};
