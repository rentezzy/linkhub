import { getUser, supabaseServer } from "@/lib/supabase";

export const LinkList = async () => {
  const supabase = supabaseServer();
  const user = await getUser();
  console.log(await supabase.from("link_list").select("background"));
  return <div>LinkList</div>;
};
