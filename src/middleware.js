import { withAuth } from "next-auth/middleware";

const myMiddleware = withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/dashboard"],
};

export default myMiddleware;
