"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Meteors } from "./ui/Meteors";

const FormValidation = z
  .object({
    Name: z
      .string()
      .regex(/^[A-Za-z\s]+$/, "Name must be only contain alphabetic characters")
      .min(2, "Name must be contain min 2 Characters")
      .max(50, "Name must be contain max 50 Characters"),
    Email: z.string().min(1, "Email confirm is required").email(),
    Password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one Uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
    ConfirmPassword: z.string().min(1, "Password confirm is required"),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    path: ["ConfirmPassword"],
    message: "Passwords don't match",
  });

const RegisterForm = () => {
  const [PasswordShow, setPasswordShow] = useState(false);
  const [ConfirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormValidation),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    },
  });

  const onSubmit = async (value) => {
    const email = value.Email;
    const name = value.Name;
    const password = value.Password;
    setisLoading(true);
    try {
      const UserExist = await fetch("/api/userExits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await UserExist.json();

      if (user) {
        toast("User already Exist", {
          description: `${user.email} is already  exist in Database`,
          className:
            "group-[.toaster]:border-2 group-[.toaster]:border-red-400 group-[.toaster]:bg-red-200",
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        return setisLoading(false);
      }

      const register = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      //ok:- server has successfully processed(get) the request from client
      if (register.ok) {
        toast(`${name}`, {
          description: `${name} you Register successfully`,
          className:
            "group-[.toaster]:border group-[.toaster]:border-green-400 group-[.toaster]:bg-green-200",
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        form.reset();
        router.push("/");
      } else {
        console.log("Error occurred on register part ");
      }
    } catch (error) {
      console.log("Error on onSubmit Function sending data to server", error);
    }
  };
  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="shadow-2xl p-5 rounded-lg border-t-4 overflow-hidden border border-green-600 bg-[#e7e7e7] w-fit sm:w-[350px] lg:w-[450px] bg-gradient-to-r from-green-300 relative ">
          <h1 className="text-xl dark:text-black font-bold my-4 text-center font-serif tracking-wider sm:text-2xl">
            Register
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                name="Name"
                formControl={form.control}
                placeholder="Enter Your Full Name"
                inputType="text"
              />
              <InputField
                name="Email"
                formControl={form.control}
                placeholder="Enter Your Email ID"
                inputType="email"
              />
              <div className="relative">
                <InputField
                  name="Password"
                  formControl={form.control}
                  placeholder="Enter Password"
                  inputType={PasswordShow ? "text" : "password"}
                  className={"pr-10"}
                />
                {PasswordShow ? (
                  <FaEye
                    onClick={() => setPasswordShow(!PasswordShow)}
                    className="absolute top-3 text-lg right-3 cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setPasswordShow(!PasswordShow)}
                    className="absolute top-3 text-lg right-3 cursor-pointer "
                  />
                )}
              </div>
              <div className="relative">
                <InputField
                  name="ConfirmPassword"
                  formControl={form.control}
                  placeholder="Enter ConfirmPassword"
                  inputType={ConfirmPasswordShow ? "text" : "password"}
                  className={"pr-10"}
                />
                {ConfirmPasswordShow ? (
                  <FaEye
                    onClick={() => setConfirmPasswordShow(!ConfirmPasswordShow)}
                    className="absolute top-3 text-lg right-3 cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setConfirmPasswordShow(!ConfirmPasswordShow)}
                    className="absolute top-3 text-lg right-3 cursor-pointer"
                  />
                )}
              </div>
              {isLoading ? (
                <Button disabled className="w-full text-base">
                  Register
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit" className="w-full text-base">
                  Register
                </Button>
              )}
            </form>
          </Form>
          <Link className="text-sm mt-3 text-right dark:text-black" href={"/"}>
            <p className="mt-2">
              Already have account ? <span className="underline">Login</span>
            </p>
          </Link>

          <Meteors number={35} />
        </div>
      </div>
    </>
  );
};
export default RegisterForm;

const InputField = ({
  name,
  formControl,
  placeholder,
  inputType,
  className,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type={inputType}
              placeholder={placeholder}
              {...field}
              className={className}
            />
          </FormControl>
          <FormMessage className="text-xs lg:text-sm w-full mt-0.5" />
        </FormItem>
      )}
    />
  );
};
