import {Schema, model} from 'mongoose'
const mailSender = require('../utils/mailSender');

type EmailType = {
    email: string
    otp: string
}

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});
// Define a function to send emails
async function sendVerificationEmail(email: any, otp: any) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}
otpSchema.pre("save", async function (next: () => void) {
    console.log("New document saved to the database");
    // Only send an email when a new document is created
    // @ts-ignore
    if (this.isNew) {
        // @ts-ignore
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});
module.exports = model("OTP", otpSchema); 