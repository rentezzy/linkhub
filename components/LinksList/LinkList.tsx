import { getUser, supabaseServer } from "@/lib/supabase";
import { LinkListDatabase } from "@/types/common";
import { EditOutlined, ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const LinkList = async () => {
  const supabase = supabaseServer();
  const user = await getUser();
  if (!user) return;
  const lists = await supabase
    .from("link_list")
    .select("*")
    .eq("author", user.id);

  if (!lists.data) return;
  if (lists.data.length === 0) return <p>No link list&apos;s here yet!</p>;
  return (
    <div className="flex flex-col gap-2">
      {lists.data.map((list) => (
        <LinkListCard key={list.id} list={list}></LinkListCard>
      ))}
    </div>
  );
};
const LinkListCard = ({ list }: { list: LinkListDatabase }) => {
  return (
    <div
      className="p-2 rounded-md text-[#fff] transition-all hover:scale-[1.001] flex justify-between items-center"
      style={{ backgroundColor: list.background }}
    >
      <p>{list.title}</p>
      <div className="space-x-2">
        <Button size="small" type="primary" icon={<EditOutlined />}></Button>
        <Button
          size="small"
          type="primary"
          icon={<ExportOutlined />}
          href={`/l/${list.code}`}
          target="blank"
        ></Button>
      </div>
    </div>
  );
};
