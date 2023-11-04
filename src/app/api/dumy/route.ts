import User from "@/models/userModel";
import { connectDB } from "@/utils/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDB()
    const user = await User.find()

    return NextResponse.json(user)
}

export async function POST(req: NextRequest) {
    const res: any = await req.json()
    console.log(res);

    await connectDB();
    const fine_data = {
        fullName: res.fullName,
        companyName: res.companyName,
        email: res.email,
        role: res.role,
        department: res.department,
        password: res.password,
        uniqueID: res.data.id,
    };
    // const newUser = new User(fine_data);
    const saveUser = await User.create(fine_data);
    console.log(saveUser, "saved user");

    return NextResponse.json({ msg: "sas" })
}


// {
//     "fullName": "kity",
  
//     "companyName": "home",
  
//     "email": "kity@meow.com",
  
//     "role": "Cat",
  
//     "department": "roar",
  
//     "password": "meow",
  
//     "uniqueID": "1n2k13n1232nknd@kdnaknas"
//   }