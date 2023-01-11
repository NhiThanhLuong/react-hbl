import { Card } from "antd";
import React from "react";

const PostComment = ({ data }) => {
  return (
    <Card
      className="rounded-3xl mb-2 bg-slate-100"
      bodyStyle={{
        padding: 8,
        marginLeft: 16,
      }}
    >
      <p className="text-blue-600 font-medium">{data.creator.fullname}</p>
      <p>{data.content}</p>
      {data.stickers &&
        data.stickers.map((sticker) => (
          <img key={sticker.id} src={sticker.uri} alt="" width={80} />
        ))}
    </Card>
  );
};

export default PostComment;
