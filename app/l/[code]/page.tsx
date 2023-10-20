import { LinkListPage } from "@/components/LinkListReady/LinkListPage";
import { supabaseClient } from "@/lib/supabase";
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
  const supabase = supabaseClient();
  const codes = await supabase.from("link_list").select("code");
  return codes.data;
});

const LinkList = async ({ params }: { params: { code: string } }) => {
  const codes = await getCodes();
  if (!codes || !codes.find((item) => item.code === params.code)) {
    notFound();
  }
  return <LinkListPage code={params.code} />;
};

export default LinkList;
