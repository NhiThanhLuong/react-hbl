/* eslint-disable no-unused-vars */
import { MoreOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Card, Col, Dropdown, Row, Tooltip } from "antd";
import React, { useState } from "react";
import { deleteCommentAPI, patchCommentAPI } from "ultis/api";

const PostComment = ({ data, postId }) => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);

  const handleEditComment = (e) => {
    // console.log(postId);
    // console.log(data.id);
    patchCommentAPI({
      post_id: postId,
      postcomment_id: data.id,
      content: "edited",
    });
  };

  const handleDeleteComment = async () => {
    await deleteCommentAPI({
      post_id: postId,
      postcomment_id: data.id,
    });

    queryClient.setQueryData(["infiniteComments", postId], (oldData) => ({
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        data: page.data.filter((comment) => comment.id !== data.id),
        total_count: page.total_count - 1,
      })),
    }));
  };

  return (
    <Row className="items-center">
      <Col span={22}>
        <Card
          className="rounded-3xl mb-2 bg-slate-100"
          bodyStyle={{
            padding: 0,
            marginLeft: 16,
          }}
        >
          {isEdit ? (
            <span>text</span>
          ) : (
            <>
              <p className="text-blue-600 font-medium">
                {data.creator.fullname}
              </p>
              <p>{data.content}</p>
              {data.stickers &&
                data.stickers.map((sticker) => (
                  <img key={sticker.id} src={sticker.uri} alt="" width={80} />
                ))}
            </>
          )}
        </Card>
      </Col>
      <Col span={2} className="text-center">
        <Dropdown
          className="cursor-pointer"
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <span onClick={handleEditComment} role="presentation">
                    Edit
                  </span>
                ),
              },
              {
                key: "2",
                label: (
                  <span onClick={handleDeleteComment} role="presentation">
                    Delete
                  </span>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <span
            role="presentation"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Tooltip title="Edit or Delete this">
              <MoreOutlined />
            </Tooltip>
          </span>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default PostComment;
