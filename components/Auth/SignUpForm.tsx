"use client";
import { emailRules, passwordRules, usernameRules } from "@/lib/validators";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Form, Input, notification } from "antd";

type FieldType = {
  email: string;
  password: string;
  publicName: string;
};

export const SignUpForm = () => {
  const supabase = createClientComponentClient();

  async function signUp({ email, password, publicName }: FieldType) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: publicName,
        },
      },
    });
    if (error) {
      notification.error({
        role: "status",
        message: error.message,
        duration: 2,
      });
    }
  }
  return (
    <Form
      name="Sign-up"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={signUp}
      autoComplete="off"
      size="large"
      requiredMark="optional"
    >
      <Form.Item<FieldType>
        label="Public Name"
        name="publicName"
        rules={usernameRules}
      >
        <Input />
      </Form.Item>
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
          Sign Up!
        </Button>
      </Form.Item>
    </Form>
  );
};
