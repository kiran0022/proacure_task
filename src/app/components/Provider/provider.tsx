"use client";
import context from "../context";
import { useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  //   const user = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  return (
    <context.Provider value={[email, setEmail]}>{children} </context.Provider>
  );
};

export default Provider;

// function App() {
// 	const user = localStorage.getItem("token");
// 	const [email, setEmail] = useState("");
// 	return (
// 		<context.Provider value={[email,setEmail]}>
// 		<Routes>
// 			<Route path="/main" exact element={<Main />} />
// 			<Route path="/signup" exact element={<Signup />} />
// 			<Route path="/login" exact element={<Login />} />
// 			<Route path="/" element={<Navigate replace to="/signup" />} />
// 			<Route path="/otpVerify" exact element={<OTPVerify />} />
// 		</Routes>
// 		</context.Provider>
// 	);
// }

// export default App;
