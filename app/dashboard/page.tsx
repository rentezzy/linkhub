import { CreateLinkList } from "@/components/LinksList/CreateLinkList";
import { getUser } from "@/lib/supabase";
import { Divider } from "antd";

export default async function Dashboard() {
  const user = await getUser();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <CreateLinkList />
      </div>
      <Divider style={{ margin: 0 }} />
    </div>
  );
}
