import { Rule } from "antd/es/form";

export const emailRules: Rule[] = [
  { required: true, message: "Please input your email." },
  { type: "email", message: "Please input valid email." },
  { max: 50, message: "Max length is 50 symbols." },
];
export const passwordRules: Rule[] = [
  { required: true, message: "Please input your password!" },
  { max: 50, message: "Max length is 50 symbols." },
];
export const usernameRules: Rule[] = [
  { required: true, message: "Please input your username." },
  { type: "string", message: "Please input correct username." },
  { max: 50, message: "Max length is 50 symbols." },
];
