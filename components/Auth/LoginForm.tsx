"use client";
import { emailRules, passwordRules } from "@/lib/validators";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Form, Input, notification } from "antd";

type FieldType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const supabase = createClientComponentClient();

  async function logIn(values: FieldType) {
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      notification.error({
        description: "Check the correctness of the entered data.",
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
      <Form.Item<FieldType> label="Email" name="email" rules={emailRules}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={passwordRules}
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
