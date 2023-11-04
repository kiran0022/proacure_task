"use client";

import user from "../../images/user.png";
import OtpInput from "react-otp-input";
import { useState, useContext } from "react";
// import { useLocation } from 'react-router-dom'
import axios from "axios";
import { useRouter } from "next/navigation";
import context from "../context";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/userModel";

const OTP = () => {
  let [email, setEmail] = useContext(context);
  let [msg] = useContext(context);

  console.log(email);

  const route = useRouter();
  //   const { state } = useLocation()
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  async function onOTPVerify(_props: any) {
    try {
      //   console.log(email);

      // storing email for otp

      // let hours = 2
      // let saved:any = localStorage.getItem('email')
      // if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
      //   localStorage.removeItem("email")
      // }

      // Increase expiration time after save
      // localStorage.setItem('email', new Date().getTime().toString())

      // const url = "http://localhost:3000/api/send";
      // const { data: res } = await axios.post(url, { email });

      // if (otp === res.verify_otp)

      const otp_code = sessionStorage.getItem("otp_code");
      if (otp_code === otp) {
        console.log("otp success");

        sessionStorage.removeItem("otp_code");
        route.push("/login");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  }

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text");
    console.log(data);
  };

  console.log("otp", msg);

  return (
    <div className="max-w-4xl min-h-screen m-auto flex justify-center flex-col gap-5 text-center ">
      <h1 className="text-5xl font-bold">Please enter the OTP</h1>
      <p className="font-medium">
        The One-Time Password has been sent to your email Id{" "}
      </p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        containerStyle={{
          marginLeft: "auto",
          marginRight: "auto",
          padding: "1rem",
        }}
        inputStyle={{
          border: "2px solid hsl(54, 0%, 91%)",

          width: "8rem",
          height: "3rem",
          fontSize: "1.5rem",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 0px 5px hsl(54, 0%, 91%)",
          borderRadius: "5px",
        }}
        shouldAutoFocus={true}
        onPaste={handlePaste}
        renderSeparator={<span style={{ padding: "12px" }}></span>}
        renderInput={(props) => <input {...props} />}
      />
      <button
        onClick={onOTPVerify}
        className="self-center w-96 px-2 py-3 rounded-md text-zinc-100 text-sm bg-blue-600"
      >
        Continue
      </button>
      {error && <span>{error}</span>}
      <p className="text-sm">
        Didn&apos;t receive an email?{" "}
        <span className="underline font-medium text-sm text-blue-600 text-center">
          Click to Resend
        </span>
      </p>
    </div>
  );
};

export default OTP;
