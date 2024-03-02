import { FC, useEffect, useState } from "react";
import { Button, Flex, Skeleton, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery } from "@apollo/client";

interface IProps {}

const GROUP = gql`
  query pagedUserGroups($id: UUID!) {
  pagedGroups(
    where: {
      id: {eq: $id}
    }
  ) {
    totalCount
    items {
      title
      id
      users {
       age
      email
      fullName
      phoneNumber
      id
      role
      }
    }
  }
}
`;

export const Group: FC<IProps> = (): JSX.Element => {
  const { groupId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ groupData, setGroupData ] = useState<any>();
  const [ executeSearch ] = useLazyQuery(GROUP);

  useEffect(() => {
    if (groupId) {
      executeSearch({ variables: { id: groupId } }).then((data) => {
        setGroupData(data.data.pagedGroups.items[0]);
      });
    }
  }, [ groupId ]);

  const config: any = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      align: "left",
      key: "phoneNumber",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Institute",
      dataIndex: "institute",
      key: "institute",
    },
    {
      title: t("users.actions"),
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "100px",
      align: "center",
      render: (record: any) => <Button
        onClick={() => navigate("/students/" + record.id)}
      >{t("users.view")}</Button>,
    },
  ];

  return (
    <Flex vertical>
      <Skeleton loading={!groupData} active={true}>
        <Title level={3}>{groupData?.title}</Title>
        <Title level={5}>Students ({groupData?.users.length})</Title>
        <Table
          columns={config}
          dataSource={groupData?.users as any || []}
          pagination={{ total: groupData?.users.length }}
        />

        <Title level={5}>Subjects (N/a)</Title>
        <div>add</div>
      </Skeleton>
    </Flex>
  );
};