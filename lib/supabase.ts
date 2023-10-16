import { Database } from "@/types/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const supabaseServer = () => {
  cookies().getAll();
  return createServerComponentClient<Database>({ cookies });
};

export const getUser = async () => {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
export const getSession = async () => {
  const supabase = supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};
