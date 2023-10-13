"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Steps, message } from "antd";
import { useState } from "react";
import { FirstStage } from "./CreateStages";

const steps = [
  {
    title: "Create page",
    content: <FirstStage />,
  },
  {
    title: "Links",
    content: "Second-content",
  },
  {
    title: "Finish",
    content: "Last-content",
  },
];

export const CreateLinkList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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
        footer={
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
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
          </div>
        }
        keyboard
        maskClosable
      >
        <div className="">
          <Steps
            current={currentStep}
            items={items}
            onChange={onChangeCurrentStep}
          />
          <div className="mt-[24px]">{steps[currentStep].content}</div>
        </div>
      </Modal>
    </div>
  );
};
