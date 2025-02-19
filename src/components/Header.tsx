import React, { useContext, useEffect } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import UserDetailsContext from "../store/userDetailContext.tsx";
import CartContext from "../store/cartStore.tsx";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const userCtx = useContext(UserDetailsContext);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("https://fakestoreapi.com/users/6");
        const data = await response.json();
        userCtx.setUserData(data);
        console.log("fetched");
      } catch (error) {
        console.error("failed to fetch:", error);
      }
    }

    if (!userCtx.userData) {
      fetchUserData();
    }
  }, [userCtx]);

  function handleShowUser() {
    userCtx.showUser();
  }

  const totalCartItems = cartCtx.totalItems;
  return (
    <nav className="w-full flex flex-row justify-between items-center py-2 sm:py-2 sm:px-12 md:px-24 bg-white shadow-md">
      <button
        onClick={handleShowUser}
        className="flex w-[130px] sm:w-[200px] items-center space-x-2 sm:space-x-4 hover:shadow-lg rounded-full p-2 transition-shadow duration-300"
      >
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <FaUserCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
        </div>

        <h1 className="flex text-lg sm:text-xl font-semibold text-gray-800">
          {userCtx.userData ? userCtx.userData.username : "User name"}
        </h1>
      </button>
      <Link to={"/"}>
        <div className="w-24 sm:w-40">
          <img src="/image/logo.png" alt="Logo" className="w-full h-auto" />
        </div>
      </Link>

      <Link
        to={"/ShoppingCart"}
        className="flex w-[130px] sm:w-[200px] justify-between items-center space-x-2 sm:space-x-4 hover:shadow-lg rounded-full px-4 py-2 sm:px-6 sm:py-4 transition-shadow duration-300"
      >
        <FaShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Cart</h1>
        <span className="rounded-full w-6 bg-slate-800 text-white flex flex-col justify-center items-center">
          {totalCartItems || 0}
        </span>
      </Link>
    </nav>
  );
};

export default Header;
