import { LinkStore } from "@/types/common";
import { Button } from "antd";

export const LinkCardPreview = ({ link }: { link: LinkStore }) => {
  return (
    <div
      className="border rounded-md flex-grow max-w-full"
      style={{ borderColor: link.bg, backgroundColor: link.bg }}
    >
      <Button
        type="link"
        href={link.href}
        target="_blank"
        style={{ color: "white" }}
        className="overflow"
      >
        {link.text}
      </Button>
    </div>
  );
};
