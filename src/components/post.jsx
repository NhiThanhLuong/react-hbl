/* eslint-disable no-unused-vars */
import { Card, Divider } from "antd";
import React from "react";
import { PostComments } from "components";

const Post = ({ item }) => {
  return (
    <Card className="mb-8">
      <p className="text-blue-600 font-medium">{item.creator.fullname}</p>
      <Divider />
      <p className="font-semibold text-base">{item.title}</p>
      <div>{item.content}</div>
      {item.post_images.length > 0 &&
        item.post_images.map((image) => (
          <img
            className="w-[400px] mr-2"
            key={image.key}
            src={image.uri}
            alt=""
          />
        ))}
      <Divider className="my-2" />
      <PostComments post_id={item.id} />
    </Card>
  );
};

export default Post;
