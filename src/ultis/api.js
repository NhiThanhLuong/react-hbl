import axiosClient from "./axios";

// Auth
export const postLogin = async ({ username, password }) =>
  await axiosClient.post("/hbl-social-auth-dev/v1/auth/sign-in", {
    username,
    password,
  });

// Posts
export const getPosts = async (params) =>
  await axiosClient.get("/hbl-social-main-dev/v1/posts", { params });

// Post Comments
export const getComment = async ({ post_id, ...params }) =>
  await axiosClient.get(`/hbl-social-main-dev/v1/posts/${post_id}/comments`, {
    params,
  });

export const postCommentAPI = async ({ post_id, ...params }) =>
  await axiosClient.post(
    `/hbl-social-main-dev/v1/posts/${post_id}/comments`,
    params
  );
export const patchCommentAPI = async ({ post_id, postcomment_id, content }) =>
  await axiosClient.patch(
    `/hbl-social-main-dev/v1/posts/${post_id}/comments/${postcomment_id}`,
    {
      content,
    }
  );

export const deleteCommentAPI = async ({ post_id, postcomment_id }) =>
  await axiosClient.delete(
    `/hbl-social-main-dev/v1/posts/${post_id}/comments/${postcomment_id}`
  );

// Profiles
export const getProfileId = async (account_id) =>
  await axiosClient.get(`/hbl-social-main-dev/v1/profiles/${account_id}`);

export const postFile = async (formData) => {
  return await axiosClient.post("/nadh-mediafile/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
