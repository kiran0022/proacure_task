"use client";

import { FaCircleUser } from "react-icons/fa6";
import Image from "next/image";
const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <FaCircleUser className="text-7xl text-neutral-700" />
      <h1 className="text-5xl font-semibold mt-10">
        Hi <span className="text-blue-600">{"kiran"}</span> you are logged in!!
      </h1>
    </div>
  );
};

export default Dashboard;
