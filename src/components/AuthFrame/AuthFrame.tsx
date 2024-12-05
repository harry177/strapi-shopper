import { Card, Flex, Typography } from "antd";
import { LoginForm } from "../LoginForm/LoginForm";
import { Link } from "react-router-dom";
import { IAuthFrame } from "../types";
import { SignupForm } from "../SignupForm/SignupForm";
import "./auth-frame.scss";

export const AuthFrame = ({ isLogin }: IAuthFrame) => {
  return (
    <Card>
      <Flex vertical className="auth-frame">
        <Typography.Title className="auth-frame__title">
          {isLogin ? "Login here" : "Create Account"}
        </Typography.Title>
        <Typography.Paragraph className="auth-frame__appeal">
          {isLogin
            ? "Welcome back, you've been missed!"
            : "Create an account and explore amazing sneakers"}
        </Typography.Paragraph>
        {isLogin ? <LoginForm /> : <SignupForm />}
        <Link to={isLogin ? "/signup" : "/login"}>
          <Typography.Paragraph className="auth-frame__redirect">
            {isLogin ? "Create new account" : "Already have an account"}
          </Typography.Paragraph>
        </Link>
      </Flex>
    </Card>
  );
};
