import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/signin",
        formData
      );
      const data = response.data;
      localStorage.setItem("token", data.token); // switched to localStorage
      if (response.status === 200) {
        alert(data.message);
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signin failed");
      navigate("/signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {loading && <LoadingOverlay />}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button className="w-full bg-black text-white py-2 rounded-md">
            Sign In
          </button>
        </form>
        <p className="text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
