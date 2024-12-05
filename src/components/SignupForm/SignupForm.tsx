import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSignupUserMutation } from "../../features/api/api";
import { IAuthUser } from "../../features/types";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Spin } from "antd";
import type { FormProps } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { SignupFormSchema, TSignupFormSchema } from "./schema";

export const SignupForm = () => {
  const [responseError, setResponseError] = useState("");

  const [cookies, setCookie] = useCookies([
    "accessToken",
    "userId",
    "userDocumentId",
    "userName",
  ]);

  const [signupUser, { data, error, isLoading, isSuccess }] =
    useSignupUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const {
        jwt,
        user: { id, documentId, username },
      } = data as IAuthUser;
      setCookie("accessToken", jwt, { path: "/" });
      setCookie("userId", id, { path: "/" });
      setCookie("userDocumentId", documentId, { path: "/" });
      setCookie("userName", username, { path: "/" });
      navigate("/");
    }
    if (error) {
      setResponseError("Invalid email or password");
      console.log(cookies);
    }
  }, [isSuccess, error]);

  const [form] = Form.useForm<TSignupFormSchema>();
  const rule = createSchemaFieldRule(SignupFormSchema);

  const onFinish: FormProps<TSignupFormSchema>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const authUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    await signupUser(authUser);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onChange={() => setResponseError("")}
      onFinish={onFinish}
      className="login-form"
    >
      <div className="spin-container">
        {isLoading && <Spin />}
        {responseError && (
          <Alert message={responseError} type="error" showIcon />
        )}
      </div>
      <Form.Item label="Username" name="username" hasFeedback rules={[rule]}>
        <Input
          prefix={<UserOutlined />}
          size="large"
          placeholder="Enter your name"
        />
      </Form.Item>
      <Form.Item label="Email" name="email" hasFeedback rules={[rule]}>
        <Input
          prefix={<UserOutlined />}
          size="large"
          placeholder="Enter your email"
        />
      </Form.Item>
      <Form.Item label="Password" name="password" hasFeedback rules={[rule]}>
        <Input
          prefix={<LockOutlined />}
          size="large"
          placeholder="Enter your password"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().some(({ errors }) => errors.length)
            }
            className="submit-button"
          >
            Submit
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
