"use client";

import { theme } from "@/lib/theme";
import { StyleProvider } from "@ant-design/cssinjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ConfigProvider } from "antd";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";

export const AuthContext = createContext(null);

export const Providers = ({
  accessToken,
  children,
}: {
  accessToken: string | null;
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

  return (
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
};

// TODO:

// const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
//   const cache = useMemo<Entity>(() => createCache(), []);
//   useServerInsertedHTML(() => (
//     <style
//       id="antd"
//       dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
//     />
//   ));
//   return <StyleProvider cache={cache}>{children}</StyleProvider>;
// };
