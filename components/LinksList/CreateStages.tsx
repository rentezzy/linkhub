import { ColorPicker, Input } from "antd";
import { Color } from "antd/es/color-picker/color";
import { ChangeEventHandler, useState } from "react";
import { useLinkListStore } from "./LinkListStore";

export const FirstStage = () => {
  const updateLinkList = useLinkListStore((state) => state.updateLinkList);
  const linkList = useLinkListStore((state) => state.linkList);
  const [open, setOpen] = useState(false);

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateLinkList({ ...linkList, title: e.target.value });
  };
  const onColorChange = (color: Color) => {
    updateLinkList({ ...linkList, bg: color.toHex() });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="link_list_create_title">Title:</label>
        <Input
          onChange={onTitleChange}
          value={linkList.title}
          id="link_list_create_title"
        />
      </div>
      <div className="flex gap-2 items-center">
        <label>Background color:</label>
        <ColorPicker
          showText={(color) => <span>{color.toHexString().toUpperCase()}</span>}
          onChange={onColorChange}
          defaultValue={linkList.bg}
          disabledAlpha
        />
      </div>
    </div>
  );
};
