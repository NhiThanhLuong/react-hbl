import { useInfiniteQuery } from "@tanstack/react-query";
import { getComment } from "ultis/api";

const PAGE_SIZE = 5;

const GetCommentFn = async ({ queryKey, pageParam = 1 }) => {
  const data = await getComment({
    post_id: queryKey[1],
    page: pageParam,
    page_count: PAGE_SIZE,
  });
  return {
    ...data,
    page: pageParam,
    total_page: Math.ceil(data.total_count / PAGE_SIZE),
  };
};

const useInfiniteQueryComment = (post_id) => {
  const infiniteQuery = useInfiniteQuery(
    ["infiniteComments", post_id],
    GetCommentFn,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_page
          ? lastPage.page + 1
          : undefined;
      },
    }
  );
  return infiniteQuery;
};

export default useInfiniteQueryComment;
