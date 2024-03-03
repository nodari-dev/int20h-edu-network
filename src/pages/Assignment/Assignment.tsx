import { FC, useEffect, useState } from "react";
import { Button, Flex, Form, Radio, Skeleton, Tag, Typography } from "antd";
import { useParams } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import Title from "antd/es/typography/Title";

interface IProps {}

const ASSIGNMENTS = gql`
  query pagedTests($id: UUID!, $pageSize: Int, $offset: Int, $sorters: [TestDtoSortInput!] ) {
  pagedTests(
    skip: $offset
    take: $pageSize
    where: {
      or: [
        { id: { eq: $id } }
      ]
    }
    order: $sorters
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    totalCount
    items {
      title
      description
      endsAt
      status
      startsAt
      questions {
        answers {
          id
          value
        }
        correctAnswerId
        id
        title
      }
      id
    }
  }
}
`;

export const Assignment: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();
  const [ test, setTest ] = useState<any>();

  const [ executeSearch, { loading } ] = useLazyQuery(ASSIGNMENTS);
  const params = {
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sorters: {},
  };

  useEffect(() => {
    const variables: any = {
      id,
      pageSize: params.pagination.pageSize,
      offset: params.pagination.pageSize * (params.pagination.page - 1),
    };

    if (Object.keys(params.sorters).length) {
      variables.sorters = params.sorters;
    }

    executeSearch({ variables }).then(res => setTest(res.data?.pagedTests?.items[0]));
  }, [ id ]);

  /*
   const centrifuge = new Centrifuge('wss://jwp-team.com/centrifugo/connection/websocket');

   const testOpenSub = centrifuge.newSubscription('tests.opened');

   const testClosedSub = centrifuge.newSubscription('tests.closed');

   testOpenSub.on('publication', function(ctx) {
   console.log(ctx.data);
   });

   testClosedSub.on('publication', function(ctx) {
   console.log(ctx.data);
   });

   testOpenSub.subscribe();
   testClosedSub.subscribe();

   centrifuge.connect();
   */

  console.log(test);
  return (
    <Flex gap="small" vertical>
      <Skeleton loading={loading} active={true}>
        <Flex align="center" gap="6px">
          <Title level={3}>
            {test?.title}
          </Title>
          {test?.status === "CLOSED"
            ? <Tag color="error">Закрите</Tag>
            : <Tag color="success">Відкрите</Tag>
          }
        </Flex>
        <Typography>
          {test?.description}
        </Typography>
      </Skeleton>
      <Form onFinish={(data) => console.log(data)}>
        {test?.questions.map((question: any) =>
          <Form.Item name={"asdasd"}>
            <Title level={4}>adasd</Title>
            <Radio.Group style={{ display: "flex", gap: "12px" }}>
              {question?.answers.map((answer: any) =>
                <Radio.Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minWidth: "100px",
                    minHeight: "50px",
                  }} value={answer.value}
                >
                  {answer.value}
                </Radio.Button>,
              )}
            </Radio.Group>
          </Form.Item>,
        )}

        <Button type="primary" htmlType="submit">Відправити</Button>
      </Form>
    </Flex>
  );
};