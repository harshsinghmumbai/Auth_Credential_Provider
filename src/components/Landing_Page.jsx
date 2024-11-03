"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuIcon, Bell, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./Toggle_Mode";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { AuroraBackground } from "./Aurora_Background";

export function LandingPageComponent() {
  const { data, status } = useSession();
  let currentYear = new Date().getFullYear();
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-2 rounded-b-2xl dark:bg-black/25 border-gray-600 bg-white/20 backdrop-blur-sm">
        <div className="px-4 p-1.5 flex justify-between items-center">
          <div className="mr-4 hidden md:flex">
            <Link
              className="mr-6 lg:mr-11 flex items-center space-x-2"
              href="#"
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                priority
              />
              <span className="text-sm font-bold md:text-lg">Auth</span>
            </Link>
            <nav
              id="lg-Navbar"
              className="flex items-center space-x-6 text-sm font-medium"
            >
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Link
                      className="transition-colors hover:text-foreground/80 text-foreground/60 md:text-base font-bold"
                      href="#"
                    >
                      Services
                    </Link>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>No Service</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Link
                      className="transition-colors hover:text-foreground/80 text-foreground/60 md:text-base font-bold"
                      href="#"
                    >
                      About
                    </Link>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>No About</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Link
                      className="transition-colors hover:text-foreground/80 text-foreground/60 md:text-base font-bold"
                      href="#"
                    >
                      Contact
                    </Link>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>No About</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </nav>
          </div>
          <div id="Hamburger" className="md:hidden">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <MenuIcon className="h-5 w-5" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>No Navbar</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <Link
            className="mr-6 flex items-center space-x-2 ml-3 md:hidden"
            href="#"
          >
            <Image src="/logo.svg" alt="Logo" width={32} height={32} priority />
            <span className="text-lg font-bold">Auth</span>
          </Link>
          <div className="flex items-center  justify-between space-x-2 md:justify-end">
            <div className="w-full md:w-auto md:flex-none">
              <Input
                className="hidden md:flex h-9"
                placeholder="Search..."
                type="search"
              />
            </div>
            <nav id="User_Section" className="flex items-center space-x-2">
              <Menubar className="border">
                <MenubarMenu>
                  <MenubarTrigger>
                    <Bell className="h-4 w-4" />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>No Notification</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <Menubar className="border md:hidden">
                <MenubarMenu>
                  <MenubarTrigger>
                    <Search className="h-4 w-4" />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>No Search</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>

              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none dark:text-white">
                        Welcome
                        <span className="ml-2">
                          {status === "unauthenticated"
                            ? "ABCDEF"
                            : data?.user?.name}
                        </span>
                      </h1>
                      <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        We&apos;re building the future of technology. Join us on
                        this exciting journey.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Button>Get Started</Button>
                      <Button variant="outline" className="dark:text-white">
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                      <div className="relative flex items-center justify-center">
                        <div className="bg-white dark:bg-white p-6 rounded-lg shadow-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                              <h2 className="text-2xl font-bold">
                                {status === "unauthenticated"
                                  ? "ABCDEF"
                                  : data?.user?.name}
                              </h2>
                              <p className="text-muted-foreground">
                                {status === "unauthenticated"
                                  ? "abcdef@gmail.com"
                                  : data?.user?.email}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between items-center dark:text-white">
                            {status === "unauthenticated" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  signIn("credentials");
                                }}
                                className="text-base lg:text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-wider cursor-pointer hover:text-white dark:hover:text-black"
                              >
                                Sign In
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="default"
                                onClick={() => {
                                  return signOut();
                                }}
                                className="text-base lg:text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-wider cursor-pointer dark:hover:text-black hover:text-white"
                              >
                                Sign Out
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </AuroraBackground>
      </main>

      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {currentYear} Auth. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
