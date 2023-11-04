//@ts-nocheck
import { EmailTemplate } from '@/app/components/email-template';
import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export async function POST(req) {
    try {
        const res = await req.json()
        console.log(res.email);
        console.log(res.name);
        const res_User = res.user;
        const res_Name = res.name;

        const verify_code = Math.floor(1000 + Math.random() * 9000)

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [res.email],
            subject: 'OTP Verification',
            react: EmailTemplate({ firstName: res.fullName, code: verify_code }),
        });

        await connectDB();
        // const fine_data = {
        //     fullName: res.fullName,
        //     companyName: res.companyName,
        //     email: res.email,
        //     role: res.role,
        //     department: res.department,
        //     password: res.password,

        // };

        const saveUser = await User.create(res);
        console.log(saveUser, "saved user");
        sessionStorage.setItem("otp_code", verify_otp);
        return NextResponse.json({ ...res, data, verify_otp: verify_code });
    } catch (error) {
        return NextResponse.json({ error });
    }
}


// {
//     "data": null,
//     "error": {
//       "statusCode": 400,
//       "message": "The gmail.com domain is not verified. Please, add and verify your domain on https://resend.com/domains",
//       "name": "validation_error"
//     }