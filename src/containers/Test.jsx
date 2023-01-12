/* eslint-disable no-unused-vars */
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Col, Row, Spin } from "antd";
import { Post } from "components";
import { Fragment } from "react";
import { useEffect } from "react";
import { getPosts } from "ultis/api";

const PAGE_SIZE = 1;

const GetPostsFn = async ({ pageParam = 1 }) => {
  const data = await getPosts({
    page: pageParam,
    page_count: PAGE_SIZE,
  });
  return {
    ...data,
    page: pageParam,
    total_page: Math.ceil(data.total_count / PAGE_SIZE),
  };
};

const Test = () => {
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    ["infinitePosts"],
    GetPostsFn,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_page
          ? lastPage.page + 1
          : undefined;
      },
    }
  );

  return (
    <div className="mt-24">
      <Row>
        <Col span={18}>
          <Spin spinning={isFetching} tip="Loading...">
            {data?.pages.map((page) => (
              <Fragment key={page.page}>
                {page.data.map((item) => (
                  <Post key={item.id} item={item} />
                ))}
              </Fragment>
            ))}
          </Spin>
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
        </Col>
      </Row>
    </div>
  );
};

export default Test;

// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
// import { Button, Spin } from "antd";
// import React from "react";
// import { useEffect } from "react";
// import { getCandidates } from "ultis/api";
// import TestItem from "./TestItem";

// const testAPI = async (page) => {
//   const { data } = await getCandidates({
//     params: {
//       page,
//       perPage: 10,
//     },
//   });
//   return {
//     page,
//     data,
//   };
// };

// const Test = () => {
//   const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
//     ["infiniteCandidates"],
//     ({ pageParam = 1 }) => testAPI(pageParam),
//     {
//       getNextPageParam: (lastPage, page) => {
//         return lastPage.page + 1;
//       },
//     }
//   );

//   return (
//     <div className="mt-24">
//       {/* {JSON.stringify(data?.pages)} */}
//       {data?.pages.map((page) => (
//         <div key={page.page}>
//           {page.data.map((item) => (
//             <div key={item.candidate_id}>
//               <TestItem item={item} />
//             </div>
//           ))}
//         </div>
//       ))}
//       <Spin spinning={isFetching} />
//       {hasNextPage && (
//         <div className="flex justify-center">
//           <Button
//             onClick={() => fetchNextPage()}
//             disabled={isFetching}
//             type="primary"
//           >
//             Load More...
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Test;
