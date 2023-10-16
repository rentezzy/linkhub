"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Steps, notification } from "antd";
import { useState } from "react";
import { FirstStage, SecondStage } from "./CreateStages";
import { LinkListPrivew } from "./LinkListPrivew";
import { useLinkListStore } from "./LinkListStore";

const steps = [
  {
    title: "Create page",
    content: <FirstStage />,
  },
  {
    title: "Links",
    content: <SecondStage />,
  },
  {
    title: "Finish",
    content: <LinkListPrivew />,
  },
];

export const CreateLinkList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const createLinkList = useLinkListStore((state) => state.createLinkList);
  const handleCreate = () => {
    setConfirmLoading(true);

    createLinkList()
      .then((d: string) => {
        setIsModalOpen(false);
        setCurrentStep(0);
        notification.success({ message: d });
      })
      .catch((e: string) => notification.error({ message: e }))
      .finally(() => setConfirmLoading(false));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const onChangeCurrentStep = (value: number) => {
    setCurrentStep(value);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <div>
      <Button onClick={openModal} icon={<PlusOutlined />} type="primary">
        CreateLink
      </Button>
      <Modal
        title="Create your link list!"
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleCreate}
        confirmLoading={confirmLoading}
        okText="Create"
        footer={(_, { OkBtn }) => (
          <div style={{ marginTop: 24 }}>
            {currentStep > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prevStep()}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => nextStep()}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && <OkBtn />}
          </div>
        )}
        keyboard
        maskClosable
      >
        <div>
          <Steps
            current={currentStep}
            items={items}
            onChange={onChangeCurrentStep}
          />
          <div className="mt-[24px]">{steps[currentStep].content}</div>
          {currentStep !== steps.length - 1 && (
            <>
              <Divider style={{ margin: "12px 0" }} />
              <LinkListPrivew />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
