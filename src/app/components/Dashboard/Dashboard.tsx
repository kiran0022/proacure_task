"use client";
import styles from "./styles.module.css";
import { FaCircleUser } from "react-icons/fa6";
import Image from "next/image";
const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <FaCircleUser className="text-7xl text-neutral-700" />
      <h1 className="text-5xl font-semibold mt-10">Hi you are logged in!!</h1>
    </div>
  );
};

export default Dashboard;
