import { Database } from "./database";

export type LinkListStore = {
  title: string;
  bg: string;
};
export type LinkListDatabase = Database["public"]["Tables"]["link_list"]["Row"];
export type LinkStore = {
  href: string;
  text: string;
  bg: string;
};
export type LinkDatabase = Database["public"]["Tables"]["link_links"]["Row"];
