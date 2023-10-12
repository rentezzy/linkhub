import { LogOut } from "@/components/Auth/LogOut";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = user?.user_metadata.username || null;
  return (
    <div>
      <p>{userData}</p>
      <LogOut />
    </div>
  );
}
