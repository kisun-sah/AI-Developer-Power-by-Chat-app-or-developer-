/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaRobot } from "react-icons/fa";
import { UserContext } from "../context/user.context";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    alert("You have successfully logged out.");
  };

  const handleConfirmLogout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAgree = () => {
    handleLogout();
    setShowModal(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full  shadow-md z-[1000] bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <FaRobot className="text-2xl mr-2" />
        <span className="text-xl font-bold">AI Developer</span>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <button
              onClick={handleConfirmLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Logout
            </button>
            <FaUserCircle
              className="text-3xl cursor-pointer"
              onClick={() => navigate("/profile")}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {showModal && (
       <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-900 bg-opacity-50 backdrop-blur-md">
      
       {/* Modal Box with Animation */}
       <motion.div 
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, ease: "easeOut" }}
         className="bg-white text-black p-8 rounded-lg shadow-2xl z-[1010] w-[50vw] max-w-lg"
       >
         {/* Header */}
         <h2 className="text-2xl font-bold mb-4 text-gray-900">📜 Terms and Conditions</h2>
         
         {/* Content */}
         <p className="text-gray-700 mb-4">
           Before proceeding, please review and agree to the following terms:
         </p>
         
         <ul className="text-gray-600 text-sm list-disc list-inside space-y-2 mb-4">
           <li>Respect user privacy and data security.</li>
           <li>Use the platform responsibly and ethically.</li>
           <li>Unauthorized activities may lead to suspension.</li>
           <li>Changes to terms may occur without prior notice.</li>
         </ul>
 
         <p className="text-gray-700 italic text-xs mb-4">
           By clicking <span className="font-semibold">"Agree"</span>, you accept all terms mentioned above.
         </p>
 
         {/* Buttons */}
         <div className="flex justify-end gap-4">
           <button
             onClick={handleCloseModal}
             className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
           >
             Cancel
           </button>
           <button
             onClick={handleAgree}
             className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
           >
             Agree
           </button>
         </div>
       </motion.div>
     </div>
      )}
    </header>
  );
};

export default Header;
