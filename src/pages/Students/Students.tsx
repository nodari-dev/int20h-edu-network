import { FC, useEffect, useState } from "react";
import { Button, Flex, Table, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useStudentsConfig } from "./useStudentsConfig";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery } from "@apollo/client";
import { SearchBar } from "../../components";
import { ORDER_QUERY, TQuery } from "../../models/query";

interface IProps {
}

const STUDENTS = gql`
  query pagedStudents($search: String!, $pageSize: Int, $offset: Int, $sorters: [StudentDtoSortInput!] ) {
  pagedStudents(
    skip: $offset
    take: $pageSize
    where: {
      or: [
        { fullName: { contains: $search } }
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
      age
      email
      fullName
      phoneNumber
      id
      createdAt 
      groupId
    }
  }
}
`;

export const Students: FC<IProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [ total, setTotal ] = useState<number>();
  const [ search, setSearch ] = useState<string>("");
  const [ executeSearch, { data, loading } ] = useLazyQuery(STUDENTS);
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
      setTotal(res.data.pagedStudents.totalCount);
    });
  }, [ params, search ]);

  const renderView = (record: any) => {
    return (
      <Button onClick={() => navigate("/students/" + record.id)}>{t("users.view")}</Button>
    );
  };
  const config = useStudentsConfig({ onView: renderView });

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
    console.log(filters, pagination);
    if (extra.action === "sort") {
      handleSort(sorter);
    }
  };

  return (
    <Flex gap="small" vertical>
      <Title level={3} style={{ margin: 0 }}>Студенти</Title>
      <SearchBar onSearch={handleSearch} placeholder="Search by name" />
      <Table
        loading={loading}
        columns={config}
        pagination={{ ...params.pagination, total, onChange: onPaginationChange }}
        dataSource={data?.pagedStudents?.items}
        onChange={onChange}
        scroll={{ x: 600 }}
      />
    </Flex>
  );
};