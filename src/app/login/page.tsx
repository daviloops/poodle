'use client';

import Login from "@/components/pages/Login";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  // const { status } = useSession();

  // if(status === 'authenticated') {
  //   redirect("/");
  // }
  
  return (
    <Login />
  );
};
