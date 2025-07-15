// useFetchData.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token"); // Changed to localStorage

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/v1/user/get-user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    if (token) {  // Only fetch if token exists
      getUserData();
    }
  }, [token]);

  return userData;
};

export default useFetchData;