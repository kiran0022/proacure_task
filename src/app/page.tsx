// @ts-nocheck

import Image from "next/image";
// import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  // const { url } = props;

  return (
    <main className="w-screen h-screen flex flex-col text-5xl items-center justify-center ">
      <Link
        href={"/signup"}
        className="hover:text-blue-600 hover:transition-all hover:animate-ping"
      >
        Get started
      </Link>

      <div>
        {/* <Html lang="en">
          <Button href={url}>Click me</Button>
        </Html> */}
      </div>
    </main>
  );
}

//-----------------
