import { supabaseClient } from "@/lib/supabase";
import { LinkCardPreview } from "../LinksList/LinkCard";
import { notFound } from "next/navigation";

export const LinkListPage = async ({ code }: { code: string }) => {
  const list = await getList(code);
  if (!list) return notFound();
  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: list.background }}
    >
      <div className="container mx-auto py-5">
        <h1 className="text-[48px]">{list.title}</h1>
        <section className="space-y-3">
          {list.link_links.map((link) => (
            <LinkCardPreview key={link.id} link={link} />
          ))}
        </section>
      </div>
    </div>
  );
};

const getList = async (code: string) => {
  const supabase = supabaseClient();

  const { data } = await supabase
    .from("link_list")
    .select(
      `
      id,
      title,
      background,
      link_links (
        id,
        href,
        text,
        background
      )
    `
    )
    .eq("code", code)
    .single();
  return data;
};
