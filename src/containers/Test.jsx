/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Button, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { getCandidates } from "ultis/api";
import TestItem from "./TestItem";

const testAPI = async (page) => {
  const { data } = await getCandidates({
    params: {
      page,
      perPage: 10,
    },
  });
  return {
    page,
    data,
  };
};

const Test = () => {
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    ["infiniteCandidates"],
    ({ pageParam = 1 }) => testAPI(pageParam),
    {
      getNextPageParam: (lastPage, page) => {
        return lastPage.page + 1;
      },
    }
  );

  return (
    <div className="mt-24">
      {/* {JSON.stringify(data?.pages)} */}
      {data?.pages.map((page) => (
        <div key={page.page}>
          {page.data.map((item) => (
            <div key={item.candidate_id}>
              <TestItem item={item} />
            </div>
          ))}
        </div>
      ))}
      <Spin spinning={isFetching} />
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetching}
            type="primary"
          >
            Load More...
          </Button>
        </div>
      )}
    </div>
  );
};

export default Test;
