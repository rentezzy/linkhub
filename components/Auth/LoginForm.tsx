"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Form, Input, notification } from "antd";

type FieldType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const supabase = createClientComponentClient();

  async function logIn(formData: FieldType) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      notification.error({
        description: "Check the correctness of the entered data.",
        role: "status",
        message: error.message,
        duration: 2,
      });
    }
  }
  return (
    <Form
      name="Log-In"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={logIn}
      autoComplete="off"
      size="large"
      requiredMark="optional"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your username!" },
          { type: "email", message: "Please input valid email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item className="flex items-center justify-center">
        <Button type="primary" htmlType="submit" className="w-[200px]">
          Login!
        </Button>
      </Form.Item>
    </Form>
  );
};
