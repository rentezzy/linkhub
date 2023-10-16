export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      link_links: {
        Row: {
          background: string;
          created_at: string;
          href: string;
          id: number;
          link_list_id: number;
          text: string;
        };
        Insert: {
          background?: string;
          created_at?: string;
          href: string;
          id?: number;
          link_list_id: number;
          text: string;
        };
        Update: {
          background?: string;
          created_at?: string;
          href?: string;
          id?: number;
          link_list_id?: number;
          text?: string;
        };
        Relationships: [
          {
            foreignKeyName: "link_links_link_list_id_fkey";
            columns: ["link_list_id"];
            referencedRelation: "link_list";
            referencedColumns: ["id"];
          }
        ];
      };
      link_list: {
        Row: {
          author: string | null;
          background: string;
          code: string;
          created_at: string;
          id: number;
          title: string;
          visit: number;
        };
        Insert: {
          author?: string | null;
          background?: string;
          code?: string;
          created_at?: string;
          id?: number;
          title?: string;
          visit?: number;
        };
        Update: {
          author?: string | null;
          background?: string;
          code?: string;
          created_at?: string;
          id?: number;
          title?: string;
          visit?: number;
        };
        Relationships: [
          {
            foreignKeyName: "link_list_author_fkey";
            columns: ["author"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
