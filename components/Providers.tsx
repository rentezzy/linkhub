"use client";

import { theme } from "@/lib/theme";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import Entity from "@ant-design/cssinjs/lib/Cache";
import { ConfigProvider } from "antd";
import { useServerInsertedHTML } from "next/navigation";
import { useMemo } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </StyledComponentsRegistry>
  );
};

// TODO:

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
