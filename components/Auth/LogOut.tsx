"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "antd";

export const LogOut = () => {
  const supabase = createClientComponentClient();
  async function logOut() {
    const { error } = await supabase.auth.signOut();
  }
  return <Button onClick={logOut}>Log Out</Button>;
};