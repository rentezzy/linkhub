"use client";
import { CloseOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Divider, Form, Input } from "antd";
import { Color } from "antd/es/color-picker/color";
import isUrl from "is-url";
import { ChangeEventHandler } from "react";
import { useLinkListStore } from "./LinkListStore";
import { LinkCardPreview } from "./LinkCard";

export const FirstStage = () => {
  const updateLinkList = useLinkListStore((state) => state.updateLinkList);
  const linkList = useLinkListStore((state) => state.linkList.title);
  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateLinkList({ title: e.target.value });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="link_list_create_title">Title:</label>
        <Input
          onChange={onTitleChange}
          value={linkList}
          id="link_list_create_title"
        />
      </div>
      <ColorPickerOwn />
    </div>
  );
};
const ColorPickerOwn = () => {
  const updateLinkList = useLinkListStore((state) => state.updateLinkList);
  const linkList = useLinkListStore((state) => state.linkList.bg);
  const onColorChange = (color: Color) => {
    updateLinkList({ bg: color.toHexString() });
  };
  return (
    <div className="flex gap-2 items-center">
      <label>Background color:</label>
      <ColorPicker
        showText={(color) => <span>{color.toHexString().toUpperCase()}</span>}
        onChange={onColorChange}
        defaultValue={linkList}
        disabledAlpha
      />
    </div>
  );
};

type SecondStageForm = {
  text: string;
  href: string;
  bg: Color;
};

export const SecondStage = () => {
  const updateLinks = useLinkListStore((state) => state.updateLinks);
  const addLink = useLinkListStore((state) => state.addLinks);
  const removeLink = useLinkListStore((state) => state.removeLinks);
  const links = useLinkListStore((state) => state.links);
  const [form] = Form.useForm<SecondStageForm>();
  return (
    <>
      <Form
        form={form}
        name="second stage"
        onFinish={(values: SecondStageForm) => {
          addLink({
            ...values,
            bg:
              typeof values.bg === "string"
                ? values.bg
                : values.bg.toHexString(),
          });

          form.resetFields();
        }}
        autoComplete="off"
        requiredMark="optional"
      >
        <Form.Item<SecondStageForm>
          label="Text for link"
          name="text"
          rules={[{ required: true, message: "Please, input text!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SecondStageForm>
          label="Link"
          name="href"
          rules={[
            { required: true, message: "Please, input link!" },
            {
              validator(_, value) {
                const res = links.find((link) => value === link.href);
                if (res)
                  return Promise.reject(
                    new Error("This link is already exist!")
                  );
                return Promise.resolve();
              },
            },
            {
              validator(_, value) {
                if (isUrl(value)) return Promise.resolve();
                return Promise.reject(new Error("Please, input correct link"));
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SecondStageForm>
          name="bg"
          label="Background color"
          initialValue={"#d45bfc"}
          rules={[{ required: true }]}
        >
          <ColorPicker
            showText={(color) => (
              <span>{color.toHexString().toUpperCase()}</span>
            )}
            disabledAlpha
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Create link
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: "12px 0" }} />
      <div>
        <h2 className="text-center text-[16px] mb-3">Your links</h2>
        <div className="flex flex-col gap-2">
          {[...links].map((link, index) => (
            <div key={link.href} className="w-full flex items-center gap-2">
              <LinkCardPreview link={link} />
              <Button
                type="primary"
                icon={<CloseOutlined />}
                onClick={() => removeLink(index)}
              ></Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
