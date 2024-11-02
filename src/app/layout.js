import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./AuthProvider";
import { ThemeProvider } from "@/components/Theme_Provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Auth Credentials Provider",
  description: "Created Authentication Using Credential Provider in Next.js",
  icons: {
    icon: ["/logo.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={outfit.className}>
        <main className="max-w-[1400px] m-auto">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
