import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/users/register", { email, password });

      toast.success("🎉 Registration successful!");
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      // Reset fields
      setEmail("");
      setPassword("");

      // Navigate to login
      navigate("/login");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        (error.response?.status === 409
          ? "This email is already in use."
          : "Registration failed. Please try again.");

      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                className="w-full bg-transparent focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                className="w-full bg-transparent focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
