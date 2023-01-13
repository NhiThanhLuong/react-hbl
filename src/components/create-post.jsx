import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, Row } from "antd";
import React from "react";
import { postPostsAPI } from "ultis/api";
import validator from "ultis/validate";

const CreatePost = () => {
  const [form] = Form.useForm();
  const { isLoading, mutate } = useMutation({
    mutationFn: postPostsAPI,
  });
  const onFinish = (values) => {
    mutate({
      ...values,
      file_upload_ids: ["056775858cde44a78210dae969d1fcff"],
    });
  };
  return (
    <Card className="mb-8" title="What's on your mind">
      <Form form={form} onFinish={onFinish} disabled={isLoading}>
        <Form.Item name="title" rules={validator("required")}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="content" rules={validator("required")}>
          <Input.TextArea placeholder="Content" />
        </Form.Item>
        <Row direction="row" justify="end" align="center">
          <Button
            //   loading={isSubmiting}
            htmlType="submit"
            className="w-100 input-login"
            type="primary"
          >
            Post
          </Button>
        </Row>
      </Form>
      {/* <Input.TextArea placeholder="What's on your mind" /> */}
    </Card>
  );
};

export default CreatePost;
