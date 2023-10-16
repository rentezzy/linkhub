import { LinkCardPreview } from "./LinkCard";
import { useLinkListStore } from "./LinkListStore";

export const LinkListPrivew = () => {
  const list = useLinkListStore((state) => state.linkList);
  const links = useLinkListStore((state) => state.links);
  return (
    <>
      <h3 className="text-center text-[16px] mb-3">Preview</h3>
      <div
        className="w-full h-[220px] flex justify-center p-2 px-8 transition-all rounded-lg overflow-clip"
        style={{ backgroundColor: list.bg }}
      >
        <div className="container">
          <h4 className="text-lg text-[#FFF]">{list.title}</h4>
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <LinkCardPreview link={link} key={link.href} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
