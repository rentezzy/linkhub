"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export const LogOut = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/");
    }
  }
  return (
    <Button onClick={logOut} type="primary">
      Log Out
    </Button>
  );
};
