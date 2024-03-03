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
      institute {
      code
      title
      }
      students {
       age
      email
      fullName
      phoneNumber
      id
      }
      teachers {
      email
      fullName
      id
      }
    }
  }
}
`;

export const Group: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ groupData, setGroupData ] = useState<any>();
  const [ executeSearch ] = useLazyQuery(GROUP);

  useEffect(() => {
    if (id) {
      executeSearch({ variables: { id } }).then((data) => {
        setGroupData(data.data.pagedGroups.items[0]);
      });
    }
  }, [ id ]);

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

  const teacher_config: any = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("users.actions"),
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "100px",
      align: "center",
      render: (record: any) => <Button
        onClick={() => navigate("/teachers/" + record.id)}
      >{t("users.view")}</Button>,
    },
  ];

  return (
    <Flex vertical>
      <Skeleton loading={!groupData} active={true}>
        <Title level={3}>{groupData?.title}</Title>
        <Title level={4}>{groupData?.institute.title} ({groupData?.institute.code})</Title>
        <Title level={5}>Students ({groupData?.students?.length || 0})</Title>
        <Table
          columns={config}
          dataSource={groupData?.students as any || []}
          pagination={{ total: groupData?.students?.length }}
        />

        <Title level={5}>Teachers ({groupData?.teachers?.length || 0})</Title>
        <Table
          columns={teacher_config}
          dataSource={groupData?.teachers as any || []}
          pagination={{ total: groupData?.teachers?.length }}
        />
      </Skeleton>
    </Flex>
  );
};