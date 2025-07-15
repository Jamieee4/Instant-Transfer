// SendMoney.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "../components/Loading";

const SendMoney = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transferTo, setTransferTo] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("id");
    const userName = params.get("name");

    if (!userId || !userName) {
      alert("Invalid user selected");
      navigate("/");
    }

    setTransferTo(userId);
  }, [location, navigate]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Changed to localStorage

      const response = await axios.post(
        "http://localhost:5001/api/v1/account/transfer",
        {
          transferTo,
          amount: Number(amount),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <LoadingOverlay />}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Send Money</h2>
        <form onSubmit={handleTransfer}>
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-2 border rounded-md mt-2 mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;