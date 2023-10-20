import { LinkDatabase, LinkStore } from "@/types/common";
import { Button } from "antd";

export const LinkCardPreview = ({
  link,
}: {
  link: LinkStore | Pick<LinkDatabase, "background" | "href" | "text">;
}) => {
  let bg;
  if ("bg" in link) {
    bg = link.bg;
  } else {
    bg = link.background;
  }
  return (
    <div
      className="border rounded-md flex-grow max-w-full transition-all hover:scale-[1.001]"
      style={{ borderColor: bg, backgroundColor: bg }}
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
