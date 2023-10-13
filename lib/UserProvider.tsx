"use client";

import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

export const AuthContext = createContext(null);

export const UserContext = createContext<User | null>(null);

export const UserProviders = ({
  accessToken,
  user,
  children,
}: {
  accessToken: string | null;
  user: User | null;
  children: React.ReactNode;
}) => {
  // Token refreshing.

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export const useUser = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  if (!user) router.push("/");
  return user as User;
};
