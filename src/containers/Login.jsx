import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, message, Row, Space } from "antd";
import { SignUp } from "components";
import { login } from "features/authSlice";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin } from "ultis/api";

import { _LAYOUT } from "_constants";
// import { postLogin } from "features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const username = sessionStorage?.username || "";

  const { isLoading, mutate } = useMutation({
    mutationKey: "login",
    mutationFn: postLogin,
    onSuccess: (data) => {
      dispatch(login(data));
      toast.success("Login Succesful");
      navigate("/test", { replace: true });
    },
  });

  // useEffect(() => {
  //   if (token && !loading) {
  //     navigate("/candidates", { replace: true });
  //   }
  // }, [token, navigate]);

  const onFinish = (values) => {
    setIsSubmiting(true);

    let isError = false;
    if (!values.username || !values.password) {
      message.error("Username và mật khẩu không được để trống");
      isError = true;
    }
    if (values.password && values.password.length < 6) {
      message.error("Mật khẩu phải 6 kí tự trở lên");
      isError = true;
    }

    sessionStorage.setItem("username", values.username);

    if (isError) {
      setIsSubmiting(false);
      return;
    }

    values.username = values.username.trim();
    values.password = values.password.trim();

    mutate({
      username: values.username,
      password: values.password,
    });

    setIsSubmiting(false);
    // navigate("/test", { replace: true });
  };

  return (
    <div
      className="min-vh-100 container-fluid bg-light login-page"
      style={{
        backgroundImage: `url('/login_background.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        backgroundColor: "#95de64",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        className="row flex-column align-items-center"
        style={{
          width: "min(100%, 500px)",
          borderRadius: "4px",
        }}
      >
        <Form
          disabled={isLoading || isSubmiting}
          onFinish={onFinish}
          className="login-form my-auto px-4 py-5"
          initialValues={{ username }}
        >
          <div
            className="logo"
            style={{
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            <Space size={10} direction="vertical">
              <div>
                <img
                  src={_LAYOUT.logo}
                  alt="Brand logo"
                  style={{
                    width: "200px",
                    height: "110px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                <div>Sign in to your account</div>
              </div>
            </Space>
          </div>

          <Form.Item
            name="username"
            rules={[{ required: false, message: "Không được để trống" }]}
          >
            <Input placeholder="Username" className="input-login" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: false, message: "Không được để trống" },
              // { min: 6, message: "Mật khẩu phải 6 kí tự trở lên" }
            ]}
          >
            <Input.Password placeholder="Password" className="input-login" />
          </Form.Item>
          <Row direction="row" justify="end" align="center" className="gap-2">
            <Button onClick={() => setIsOpen(true)}>Sign up</Button>
            <Button
              loading={isSubmiting}
              htmlType="submit"
              className="w-100 input-login"
              type="primary"
            >
              Log in
            </Button>
          </Row>
        </Form>
        <SignUp isOpen={isOpen} setIsOpen={setIsOpen} />
      </Card>
    </div>
  );
};

export default Login;
