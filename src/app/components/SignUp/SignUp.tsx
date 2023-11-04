"use client";
import {
  useState,
  useContext,
  FormEvent,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Image from "next/image";
import context from "../context";
import Link from "next/link";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/userModel";

type Mail = {
  email: string;
  setEmail: () => void;
};
const Signup = () => {
  let [email, setEmail] = useContext(context);
  const route = useRouter();
  const [userData, setData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    role: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  // const [msg, setMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // setEmail(userData.email);
      const url = "http://localhost:3000/api/send";
      const { data: res } = await axios.post(url, userData);
      console.log("signup data", res);
      // setMsg(res.verify_otp);

      // await connectDB();
      // const fine_data = {
      //   fullName: res.fullName,
      //   companyName: res.companyName,
      //   email: res.email,
      //   role: res.role,
      //   department: res.department,
      //   password: res.password,
      //   uniqueID: res.data.data.id,
      // };
      // const newUser = new User(fine_data);
      // const saveUser = await newUser.save();

      // const saveUser = await User.create(fine_data);
      // console.log(saveUser, "saved user");

      setTimeout(() => {
        route.push("/otp");
      }, 2000);
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  // console.log("sigun", msg);
  return (
    <div className="w-[100vw] min-h-screen m-auto flex flex-col justify-center">
      <div className="flex gap-5">
        <div className="w-[50%] ml-16">
          <h2 className="font-bold text-3xl ml-14 text-stone-800">
            Hi, Welcome Back
          </h2>
          <Image
            src={"/illustration_login.png"}
            alt="logo"
            // className={styles.logo_img}
            width={500}
            height={500}
          />
        </div>
        <div className=" w-[50%] ml-20 text-start items-center ">
          <form
            className=" flex flex-col h-[100%] justify-center gap-3 w-[30rem]"
            onSubmit={handleSubmit}
          >
            <h3 className="text-3xl font-bold">Sign Up</h3>
            <p className="text-sm">
              Have an account?{" "}
              <Link href={"/login"} className="text-blue-700 underline">
                Login
              </Link>
            </p>
            <div className="max-w-md grid-cols-2 grid gap-x-5 gap-y-6 text-sm mt-6">
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                onChange={handleChange}
                value={userData.fullName}
                required
                className="border-2 px-2 py-3 rounded-md"
              />
              <input
                type="text"
                placeholder="Company Name"
                name="companyName"
                onChange={handleChange}
                value={userData.companyName}
                required
                className="border-2 px-2 py-3 rounded-md"
              />
              {/* </div>
            <div className={styles.form_row}> */}
              <input
                type="email"
                placeholder="Email address"
                name="email"
                onChange={handleChange}
                value={userData.email}
                required
                className="border-2 px-2 py-3 rounded-md"
              />
              <input
                type="text"
                placeholder="Role/Title"
                name="role"
                onChange={handleChange}
                value={userData.role}
                required
                className="border-2 px-2 py-3 rounded-md"
              />
              {/* </div>
            <div className={styles.form_row}> */}
              <input
                type="text"
                placeholder="Department"
                name="department"
                onChange={handleChange}
                value={userData.department}
                required
                className="border-2 px-2 py-3 rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={userData.password}
                required
                className="border-2 px-2 py-3 rounded-md"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={userData.confirmPassword}
                required
                className="border-2 px-2 py-3 rounded-md col-span-2"
              />
              {/* {error && <div className={styles.error_msg}>{error}</div>} */}
              {/* {msg && <div className={styles.success_msg}>{msg}</div>} */}
              <button
                type="submit"
                className="bg-blue-600 text-zinc-100 font-semibold px-2 py-3 rounded-md col-span-2"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
