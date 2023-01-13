import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { postSignupAPI } from "ultis/api";
import validator from "ultis/validate";

const SignUp = ({ isOpen, setIsOpen }) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: postSignupAPI,
    onSuccess: (data) => {
      toast.success(data.message);
      setIsOpen(false);
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  const onFinish = (values) => {
    values.email = values.email.trim();
    values.fullname = values.fullname.trim();
    values.password = values.password.trim();
    values.phone_number = values.phone_number.trim();

    mutate(values);
  };

  return (
    <Modal
      destroyOnClose
      open={isOpen}
      title="Sign Up"
      onCancel={() => setIsOpen(false)}
      footer={[
        <Button
          disabled={isLoading}
          form="form_signup"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Sign up
        </Button>,
      ]}
    >
      <Form id="form_signup" onFinish={onFinish} disabled={isLoading}>
        <Form.Item
          name="phone_number"
          rules={validator(["required", "number"])}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item name="email" rules={validator(["required", "email"])}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={validator("required")}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item name="fullname" rules={validator("required")}>
          <Input placeholder="Fullname" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUp;
