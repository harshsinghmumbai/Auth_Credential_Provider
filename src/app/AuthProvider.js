"use client";
import {
  /*now NextAuth.js can give data to any component*/ SessionProvider,
} from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
