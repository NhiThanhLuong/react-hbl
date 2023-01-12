import { Form, Input, Modal } from "antd";
import React from "react";
import validator from "ultis/validate";

const SignUp = ({ isOpen }) => {
  return (
    <Modal open={isOpen} title="Sign Up">
      <Form>
        <Form.Item
          name="username"
          //   rules={[{ required: false, message: "Không được để trống" }]}
          rules={validator("required")}
        >
          <Input placeholder="Username" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUp;
