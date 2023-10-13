import { create } from "zustand";

type State = {
  linkList: {
    title: string;
    bg: string;
  };
  links: {
    href: string;
    text: string;
    bg: string;
  }[];
};

type Action = {
  updateLinkList: (linkList: State["linkList"]) => void;
  addLinks: (link: State["links"][0]) => void;
  removeLinks: (index: number) => void;
  updateLinks: (link: State["links"][0], index: number) => void;
};

export const useLinkListStore = create<State & Action>((set) => ({
  linkList: { title: "LinkHub", bg: "#07EFB1" },
  links: [],
  updateLinkList(linkList) {
    set(() => ({ linkList }));
  },
  addLinks(link) {
    set((state) => {
      const links = [...state.links, link];
      return { links };
    });
  },
  removeLinks(index) {
    set((state) => {
      const links = [...state.links].splice(index, 1);
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
