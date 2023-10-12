import { LogOut } from "@/components/Auth/LogOut";
import { getUser } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const user = await getUser();
  const userData = user?.user_metadata.username || "TEXT";
  return (
    <div>
      {userData}
      <LogOut />
    </div>
  );
}
