"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const darkClasses = "dark:bg-white dark:text-black";
  const lightClasses = "bg-[#00000009] text-black";

  const pathname = usePathname();
  let accountDialogue = pathname.includes("login") && (
    <p className="mt-[10px]">
      Don't have an account?{" "}
      <Link className=" text-indigo-500 hover:underline" href={"/register"}>
        Register now!
      </Link>
    </p>
  );

  if (pathname.includes("register")) {
    accountDialogue = (
      <p className="mt-[10px]">
        Already have an account?{" "}
        <Link className=" text-indigo-500 hover:underline" href={"/login"}>
          Login now!
        </Link>
      </p>
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={cn(
          "p-8 w-[500px] rounded-md",
          `${lightClasses} ${darkClasses}`
        )}
      >
        <h2 className=" text-center text-[20px]">Discord Clone</h2>
        {children}
        <div>{accountDialogue}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
