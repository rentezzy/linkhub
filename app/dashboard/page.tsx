import { CreateLinkList } from "@/components/LinksList/CreateLinkList";
import { ColorPicker, Divider } from "antd";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <CreateLinkList />
      </div>
      <Divider style={{ margin: 0 }} />
    </div>
  );
}
