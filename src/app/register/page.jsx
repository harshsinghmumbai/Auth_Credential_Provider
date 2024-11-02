import RegisterForm from "@/components/RegisterForm";
// If you are Signin in dashboard form their you can not access "/" page and "/register" page
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const register = async () => {
  const session = await getServerSession(authOptions);
  //session means that if you are login redirect to dashboard page only No other else!
  if (session) redirect("/dashboard");

  return <RegisterForm />;
};

export default register;
