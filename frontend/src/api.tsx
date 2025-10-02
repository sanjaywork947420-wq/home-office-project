import axios from "axios";

const API_URL = "http://127.0.0.1:3000"; // backend URL

export const loginUser = async (id: string, password: string) => {
  try {
   
    const response = await axios.post(`${API_URL}/login`, { id, password });
  
    return response.data; // contains { success, message }

} catch (err: any) {
    alert("error")
    return { success: false, message: err.response?.data?.message || err.message };
  }
};
