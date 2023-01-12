/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Form, Input, Spin } from "antd";
import useInfiniteQueryComment from "hooks/useInfiniteQueryComment";
import React, { Fragment, useState } from "react";
import { postCommentAPI } from "ultis/api";
import PostComment from "./post-comment";

const PostComments = ({ post_id }) => {
  const queryClient = useQueryClient();
  const [commentInput, setCommentInput] = useState("");
  const { data, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQueryComment(post_id);

  const mutation = useMutation({
    mutationFn: postCommentAPI,
    onSuccess: (data) => {
      queryClient.setQueryData(["infiniteComments", post_id], (oldData) => ({
        ...oldData,
        pages: oldData.pages.map((page) =>
          page.page === 1
            ? {
                ...page,
                data: [data.data, ...page.data],
                total_count: page.total_count + 1,
              }
            : page
        ),
      }));
    },
  });

  const postCommentEnter = (e) => {
    mutation.mutate(
      {
        post_id,
        content: e.target.value,
        sticker_ids: [],
        type: "text",
      },
      {
        onSuccess: () => {
          setCommentInput("");
        },
      }
    );
  };

  return (
    <div>
      <p className="font-semibold">Comments: {data?.pages[0].total_count}</p>
      <Divider className="my-2" />
      <Spin spinning={isFetching} tip="Loading...">
        <div className="ml-4 overflow-y-auto max-h-96">
          {data?.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((item) => (
                <PostComment key={item.id} data={item} postId={post_id} />
              ))}
            </Fragment>
          ))}
          {hasNextPage && (
            <div className="flex justify-center">
              <Button
                onClick={fetchNextPage}
                disabled={isFetching}
                type="primary"
              >
                View more comments...
              </Button>
            </div>
          )}
        </div>
        <div className="mt-2">
          <Input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onPressEnter={postCommentEnter}
            placeholder="Write a comment..."
          />
        </div>
      </Spin>
    </div>
  );
};

export default PostComments;
