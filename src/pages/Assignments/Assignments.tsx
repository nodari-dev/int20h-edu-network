import { FC, useEffect, useState } from "react";
import { Button, Flex, Table, TableProps } from "antd";
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useSubjectsConfig } from "../Subjects/useSubjectsConfig";
import { ORDER_QUERY, TQuery } from "../../models/query";
import Title from "antd/es/typography/Title";
import { SearchBar } from "../../components";

interface IProps {}

const ASSIGNMENTS = gql`
  query pagedTests($search: String!, $pageSize: Int, $offset: Int, $sorters: [TestDtoSortInput!] ) {
  pagedTests(
    skip: $offset
    take: $pageSize
    where: {
      or: [
        { title: { contains: $search } }
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

export const Assignments: FC<IProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const [ total, setTotal ] = useState<number>();
  const [ search, setSearch ] = useState<string>("");
  const [ executeSearch, { data, loading } ] = useLazyQuery(ASSIGNMENTS);
  const [ params, setParams ] = useState<any>({
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sorters: {},
  });

  useEffect(() => {
    const variables: any = {
      search,
      pageSize: params.pagination.pageSize,
      offset: params.pagination.pageSize * (params.pagination.page - 1),
    };

    if (Object.keys(params.sorters).length) {
      variables.sorters = params.sorters;
    }

    executeSearch({ variables }).then((res) => {
      setTotal(res.data.pagedTests.totalCount);
    });
  }, [ params, search ]);

  const renderView = (record: any) => {
    return (
      <Button onClick={() => navigate("/assignments/" + record.id)}>View</Button>
    );
  };
  const config = useSubjectsConfig({ onView: renderView });

  const handleSearch = (v: string) => {
    setSearch(v);
    setParams({ ...params, pagination: { page: 1, pageSize: 10 }, sorters: {} });
  };

  const handleSort = (sorter: object | []): void => {
    if (sorter.constructor === Array) {
      sorter = [ ...sorter ];
    } else {
      sorter = [ sorter ];
      params.sorters = {};
    }

    (sorter as { field: string, order: TQuery }[]).forEach((key) => {
      params.sorters[key.field] = ORDER_QUERY[key.order];

      if (!key.order) {
        delete params.sorters[key.field];
      }

      setParams({ ...params });
    });
  };

  const onPaginationChange = (page: number, pageSize: number): void => {
    setParams({ ...params, pagination: { page, pageSize } });
  };

  const onChange: TableProps<any>["onChange"] = (pagination, filters, sorter, extra): void => {
    console.log(filters, pagination, extra);
    if (extra.action === "sort") {
      handleSort(sorter);
    }
  };

  return (
    <Flex gap="small" vertical>
      <Title level={3} style={{ margin: 0 }}>Subjects</Title>
      <SearchBar onSearch={handleSearch} placeholder="Search by title" />
      <Table
        loading={loading}
        columns={config}
        pagination={{ ...params.pagination, total, onChange: onPaginationChange }}
        dataSource={data?.pagedTests?.items}
        onChange={onChange}
        scroll={{ x: 600 }}
      />
    </Flex>
  );
};