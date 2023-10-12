import { LoginForm } from "@/components/Auth/LoginForm";
import { SignUpForm } from "@/components/Auth/SignUpForm";
import { Tabs, TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Log-in",
    children: <LoginForm />,
  },
  {
    key: "2",
    label: "Sign-up",
    children: <SignUpForm />,
  },
];

export default function Home() {
  return (
    <main className="flex h-screen w-screen">
      <div className="w-1/3 shrink-0 grow-0 flex items-center justify-center pl-6">
        <Tabs
          defaultActiveKey="1"
          items={items}
          size="large"
          centered
          className="w-[80%] min-h-[500px]"
        />
      </div>
      <div className="w-2/3 h-screen flex items-center justify-center overflow-hidden relative before:absolute before:top-0 before:left-0 before:right-[-40px] before:bottom-0 before:bg-primary before:-skew-x-3 before:ml-6">
        <h1 className="z-10 text-[white] text-[58px] select-none">
          WELCOME TO LINK HUB
        </h1>
      </div>
    </main>
  );
}
