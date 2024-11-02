import LoginForm from "@/components/LoginForm";
// If you are Signin in dashboard form their you can not access "/" page and "/register" page
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  //session means if you are Signin on dashboard then access "/"page and "/register" page kindly redirect user to dashboard
  if (session) redirect("/dashboard");

  return <LoginForm />;
}
