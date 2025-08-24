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
        "flex items-center text-[#b3b3b3] text-base font-semibold hover:bg-[#3c3c3c] px-4 py-2 hover:text-[#ffa116] transition-colors",
        className
      )}
      onClick={onLogout}
    >
      {children}
    </button>
  );
};

export default LogoutButton;
