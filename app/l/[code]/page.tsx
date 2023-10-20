import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { cache } from "react";

export const revalidate = 60;
export async function generateStaticParams() {
  const codes = await getCodes();
  if (!codes) {
    notFound();
  }
  return codes;
}
const getCodes = cache(async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const codes = await supabase.from("link_list").select("code");
  return codes.data;
});

const LinkList = async ({ params }: { params: { code: string } }) => {
  const codes = await getCodes();
  if (!codes || !codes.find((item) => item.code === params.code)) {
    notFound();
  }
  return <p>{params.code}</p>;
};

export default LinkList;
