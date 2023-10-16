import { LinkListStore, LinkStore } from "@/types/common";
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
};

export const useLinkListStore = create<State & Action>((set) => ({
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
}));
