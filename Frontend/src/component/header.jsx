import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaRobot } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <FaRobot className="text-2xl mr-2" />
        <span className="text-xl font-bold">AI Developer</span>
      </div>
      <div className="flex items-center">
        <Link to="/login" className="mr-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
        <Link to="/register" className="mr-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
        <FaUserCircle
          className="text-3xl cursor-pointer"
          onClick={() => navigate("/profile")}
        />
      </div>
    </header>
  );
};

export default Header;