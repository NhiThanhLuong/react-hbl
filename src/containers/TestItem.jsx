/* eslint-disable no-unused-vars */
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Card, Spin } from "antd";
import React, { Fragment, useEffect } from "react";
import { useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getDetailCandidate } from "ultis/api";

const perPage = 5;

const testAPI = async (id, page) => {
  const data = await getDetailCandidate(id);
  return {
    page,
    data: data.logs.slice(perPage * (page - 1), perPage * page),
    all_pages: Math.ceil(data.logs.length / perPage),
  };
};

const TestItem = ({ item }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["infiniteCandidate", item.id],
      ({ pageParam = 1 }) => testAPI(item.id, pageParam),
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage.page < lastPage.all_pages
            ? lastPage.page + 1
            : undefined;
        },
      }
    );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, isFetchingNextPage]);

  //   console.log(data);
  return (
    <Card className="mb-4">
      <p className="capitalize text-lg text-blue-600">{item.full_name}</p>
      <div className="ml-4 max-h-[700px] overflow-y-auto">
        {data?.pages.map((page) => (
          <Fragment key={page.page}>
            {page.data.map((item) => (
              <div key={item.id} className="mt-2">
                {JSON.stringify(item)}
              </div>
            ))}
          </Fragment>
        ))}
        <Spin spinning={isFetching} />
        {hasNextPage && (
          <div className="flex justify-center">
            <Button
              // ref={ref}
              type="primary"
              onClick={() => fetchNextPage()}
              disabled={isFetching}
            >
              Load More...
            </Button>
          </div>
        )}
      </div>
      {/* {JSON.stringify(hasNextPage)}
      {JSON.stringify(isFetchingNextPage)} */}
    </Card>
  );
};

export default TestItem;
