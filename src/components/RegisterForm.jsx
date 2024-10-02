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
      const UserExist = await fetch("http://localhost:3000/api/userExits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await UserExist.json();

      if (user) {
        toast("Bhai User already", {
          description: `${user.email} is already`,
          className:
            "group-[.toaster]:border-2 group-[.toaster]:border-red-400 group-[.toaster]:bg-red-200",
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        return setisLoading(false);
      }

      const register = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      if (register.ok) {
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
        <div className="shadow-lg p-5 rounded-lg border-t-4 border border-green-600 bg-[#e7e7e7] sm:w-[300px] lg:w-[450px]">
          <h1 className="text-xl font-bold my-4 text-center font-serif tracking-wider sm:text-2xl">
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
                  placeholder="Enter Confirm Password"
                  inputType={ConfirmPasswordShow ? "text" : "password"}
                />
                {ConfirmPasswordShow ? (
                  <FaEye
                    onClick={() => setConfirmPasswordShow(!ConfirmPasswordShow)}
                    className="absolute top-3 text-lg right-3"
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
          <Link className="text-sm mt-3 text-right" href={"/"}>
            <p className="mt-2">
              Already have account ? <span className="underline">Login</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};
export default RegisterForm;

const InputField = ({ name, formControl, placeholder, inputType }) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input type={inputType} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className="text-xs lg:text-sm w-full mt-0.5" />
        </FormItem>
      )}
    />
  );
};
