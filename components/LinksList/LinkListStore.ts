import { LinkListStore, LinkStore } from "@/types/common";
import { Database } from "@/types/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { create } from "zustand";

type State = {
  linkList: LinkListStore;
  links: LinkStore[];
};

type Action = {
  updateLinkList: (linkList: Partial<State["linkList"]>) => void;
  addLinks: (link: State["links"][0]) => void;
  removeLinks: (index: number) => void;
  updateLinks: (link: State["links"][0], index: number) => void;
  createLinkList: () => Promise<string>;
};

export const useLinkListStore = create<State & Action>((set, get) => ({
  linkList: { title: "LinkHub", bg: "#07EFB1" },
  links: [],
  updateLinkList(linkList) {
    set((state) => ({
      linkList: {
        ...state.linkList,
        ...linkList,
      },
    }));
  },
  addLinks(link) {
    set((state) => {
      const links = [link, ...state.links];
      return { links };
    });
  },
  removeLinks(index) {
    set((state) => {
      const links = [...state.links];
      links.splice(index, 1);
      return { links };
    });
  },
  updateLinks(link, index) {
    set((state) => {
      const links = [...state.links];
      links[index] = link;
      return { links };
    });
  },
  async createLinkList() {
    const linkList = get().linkList;
    const links = get().links;
    if (links.length === 0)
      return Promise.reject("You must enter at least one link!");
    const supabase = createClientComponentClient<Database>();
    const linkList_db = (
      await supabase
        .from("link_list")
        .insert({ background: linkList.bg, title: linkList.title })
        .select("*")
    ).data;
    if (!linkList_db)
      return Promise.reject("Something went wrong, try again later.");
    const linkList_id = linkList_db[0].id;
    for (let link of links) {
      await supabase.from("link_links").insert({
        href: link.href,
        link_list_id: linkList_id,
        text: link.text,
        background: link.bg,
      });
    }
    set(() => ({ links: [] }));
    set(() => ({ linkList: { title: "LinkHub", bg: "#07EFB1" } }));
    return Promise.resolve("Successfully created");
  },
}));
