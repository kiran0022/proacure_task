"use client";
import { ChangeEvent, FormEvent, useState } from "react";

import axios from "axios";
// import { Link } from "react-router-dom";
import styles from "./styles.module.css";
// import logo from "../../images/logo.png";
// import { useNavigate } from "react-router-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  let route = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/login";
      const { data: res } = await axios.get(url, { data });
      console.log("login", res.json());

      // route.push("/dashboard");
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

  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
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
        <div className=" w-[50%] text-start items-center ">
          <form
            className=" flex flex-col h-[80%] justify-center gap-5 w-[30rem]"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} className="text-blue-700 underline">
                SignUp
              </Link>
            </p>

            <input
              type="email"
              placeholder="Email address"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="border-2 px-2 py-3 rounded-md"
            />

            {/* <div className="mb-4 flex">
              <input
                type={type}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <span
                className="flex justify-around items-center"
                onClick={handleToggle}
              >
                <Icon className="absolute mr-10" icon={icon} size={25} />
              </span>
            </div> */}

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="border-2 px-2 py-3 rounded-md"
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <p className="text-blue-600 text-sm font-semibold">
              Forgot password?
            </p>
            <button
              type="submit"
              className=" min-w-fit rounded-md px-2 py-3 text-zinc-100 font-semibold text-lg bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
