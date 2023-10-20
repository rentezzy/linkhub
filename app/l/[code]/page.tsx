import { LinkListPage } from "@/components/LinkListReady/LinkListPage";
import { supabaseClient } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Params = { params: { code: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const code = params.code;
  const supabase = supabaseClient();
  const { data } = await supabase
    .from("link_list")
    .select("title")
    .eq("code", code)
    .single();
  if (!data) return {};
  return {
    title: `LinkHub | ${data.title}`,
  };
}

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

const LinkList = async ({ params }: Params) => {
  const codes = await getCodes();
  if (!codes || !codes.find((item) => item.code === params.code)) {
    notFound();
  }
  return <LinkListPage code={params.code} />;
};

export default LinkList;
