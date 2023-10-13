"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Steps, message } from "antd";
import { useState } from "react";

const steps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
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
        title="Basic Modal"
        open={isModalOpen}
        onCancel={closeModal}
        footer={
          <div style={{ marginTop: 24 }}>
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
            {currentStep > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prevStep()}>
                Previous
              </Button>
            )}
          </div>
        }
        keyboard
        maskClosable
      >
        <Steps
          current={currentStep}
          items={items}
          onChange={onChangeCurrentStep}
        />
        <div>{steps[currentStep].content}</div>
      </Modal>
    </div>
  );
};
