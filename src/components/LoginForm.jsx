"use client";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Meteors } from "./ui/Meteors";

const FormValidation = z.object({
  email: z.string().min(1, "Email-ID is Required").email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one Uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
});

const LoginForm = () => {
  const [PasswordShow, setPasswordShow] = useState(false);
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value) => {
    const email = value.email;
    const password = value.password;

    //client sha data NextAuth ka server par bhajana hai
    try {
      setisLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // only used in signIn method
      });

      if (res.ok === false) {
        setisLoading(false);
        return toast("Invalid Credentials", {
          description: `${email} is Invalid Credentials data`,
          className:
            "group-[.toaster]:border-2 group-[.toaster]:border-red-400 group-[.toaster]:bg-red-200 dark:text-white",
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log(
        "Error on LoginForm Component specifically on asynchronous code",
        error
      );
    }
  };
  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="shadow-2xl p-5 rounded-lg border-t-4 overflow-hidden border border-green-600 bg-[#e7e7e7] w-fit sm:w-[350px] lg:w-[450px] bg-gradient-to-r from-green-300 relative ">
          <h1 className="text-xl dark:text-black font-bold my-4 text-center font-serif tracking-wider sm:text-2xl ">
            Login
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                formControl={form.control}
                username="email"
                placeholder="Enter Your Email ID"
                inputType="email"
              />
              <div className="relative">
                <InputField
                  formControl={form.control}
                  username="password"
                  placeholder="Enter Your Password"
                  inputType={PasswordShow ? "text" : "password"}
                />
                {PasswordShow ? (
                  <FaEye
                    onClick={() => setPasswordShow(!PasswordShow)}
                    className="absolute top-3 right-3 text-lg cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setPasswordShow(!PasswordShow)}
                    className="absolute top-3 right-3 text-lg cursor-pointer"
                  />
                )}
              </div>
              {isLoading ? (
                <Button disabled className="w-full text-base dark:text-black">
                  Login
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="text-lg w-full tracking-wider font-serif cursor-pointer dark:text-black"
                >
                  Login
                </Button>
              )}
            </form>
          </Form>
          <Link
            className="text-sm mt-3 text-right dark:text-black"
            href={"/register"}
          >
            <p className="mt-2">
              Don&apos;t have account ?{" "}
              <span className="underline">Register</span>
            </p>
          </Link>

          <Meteors number={25} />
        </div>
      </div>
    </>
  );
};

export default LoginForm;

const InputField = ({ formControl, username, placeholder, inputType }) => {
  return (
    <FormField
      control={formControl}
      name={username}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} type={inputType} {...field} />
          </FormControl>
          <FormMessage className="text-xs lg:text-sm w-full mt-0.5 ml-2" />
        </FormItem>
      )}
    />
  );
};
