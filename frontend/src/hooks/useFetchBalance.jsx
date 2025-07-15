// useFetchBalance.js
import { useEffect, useState } from "react";
import axios from "axios";

const useFetchBalance = () => {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token"); // Changed to localStorage

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/v1/account/balance",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    getBalance();
  }, [token]);

  return balance;
};

export default useFetchBalance;