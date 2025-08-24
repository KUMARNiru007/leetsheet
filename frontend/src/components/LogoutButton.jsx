import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import clsx from "clsx"; // optional, for cleaner merging

const LogoutButton = ({ children, className }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <button
      className={clsx(
        "flex items-center  text-gray-200 text-base font-semibold hover:bg-[#7df9ff]/80 px-4 py-1 rounded-md hover:text-white ",
        className
      )}
      onClick={onLogout}
    >
      {children}
    </button>
  );
};

export default LogoutButton;
