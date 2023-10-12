"use client";

import { useUser } from "@/lib/UserProvider";
import Logo from "@/public/logo.png";
import { Divider } from "antd";
import Image from "next/image";
import { LogOut } from "../Auth/LogOut";
export const Header = () => {
  const user = useUser();
  const username = user?.user_metadata.username;
  return (
    <header className="h-[5vh] border-b border-primary">
      <div className="container mx-auto h-full px-2 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image alt="logo" src={Logo} className="w-[25px] h-[25px]" />
          <h2 className="text-primary text-[24px]">LinkHub</h2>
        </div>
        <div className="flex gap-2 items-center h-full">
          <Divider type="vertical" className="h-full bg-primary" />
          <p>{username}</p>
          <LogOut />
        </div>
      </div>
    </header>
  );
};
