// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from "next";
import Email from "@/emails/example-email";
import { render } from "@react-email/render";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sendEmail({
    to: "hello@world.com",
    subject: "Hello",
    html: render(Email()),
  });

  return res.status(200).json({ message: "Success" });
}
