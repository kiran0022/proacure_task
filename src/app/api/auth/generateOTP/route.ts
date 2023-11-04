// @ts-nocheck

// import crypto from "crypto";
// import twilio from "twilio";
// import bcrypt from "bcryptjs";
// import { MongoClient } from "mongodb";

// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//         return res.status(405).end(); // Method Not Allowed
//     }

//     // Generate a six digit number using the crypto module
//     const otp = crypto.randomInt(100000, 999999);

//     // Hash the OTP
//     const hashedOtp = await bcrypt.hash(otp.toString(), 10);

//     // Initialize the Twilio client
//     const client = twilio(
//         process.env.TWILIO_ACCOUNT_SID,
//         process.env.TWILIO_AUTH_TOKEN
//     );

//     try {
//         // Send the OTP via SMS
//         await client.messages.create({
//             body: `Your OTP is: ${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER, // your Twilio number
//             to: req.body.phone, // your user's phone number
//         });

//         // Store the hashed OTP in the database along with the phone number and expiry time
//         const mongoClient = new MongoClient(process.env.MONGODB_URI);
//         await mongoClient.connect();
//         const otps = mongoClient.db().collection("otps");
//         await otps.insertOne({
//             phone: req.body.phone,
//             otp: hashedOtp,
//             expiry: Date.now() + 10 * 60 * 1000, // OTP expires after 10 minutes
//         });
//         await mongoClient.close();

//         // Respond with a success status
//         res.status(200).json({ success: true });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Could not send OTP" });
//     }
// }


// controllers/authController.js

import {bcrypt} from 'bcrypt'
import {OTP} from '@/models/otpModel'
import {User} from '@/models/userModel'


exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, otp } = req.body;
    // Check if all details are provided
    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      });
    }
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};