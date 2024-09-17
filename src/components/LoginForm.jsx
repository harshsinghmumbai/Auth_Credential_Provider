"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};
  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border border-green-600 bg-[#e7e7e7] sm:w-[300px] lg:w-[450px]">
          <h1 className="text-xl font-bold my-4 text-center font-serif tracking-wider sm:text-2xl ">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input placeholder="Enter Your Email ID" type="email" />
            <Input placeholder="Enter Your Password" type="password" />
            <Button
              type="submit"
              className="bg-green-500 text-black text-base font-semibold hover:bg-green-600 text-black/80 tracking-wide sm:text-xl"
            >
              Login
            </Button>
          </form>
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            <p className="mt-2">
              Don't have account ? <span className="underline">Register</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
