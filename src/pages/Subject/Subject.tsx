import { FC, useEffect, useState } from "react";
import { Button, Flex, Skeleton, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery } from "@apollo/client";
import Title from "antd/es/typography/Title";
import { useAuthorization } from "../../hooks";
import { ROLE } from "../../models/user";

interface IProps {}

const SUBJECT = gql`
  query subject($id: UUID!) {
  pagedSubjects(
    where: {
      id: {eq: $id}
    }
  ) {
    totalCount
    items {
      id
      title
      description
    }
  }
}
`;

export const Subject: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const auth = useAuthorization();
  const navigate = useNavigate();
  const [ subject, setSubject ] = useState<any>();
  const [ executeSearch ] = useLazyQuery(SUBJECT);

  useEffect(() => {
    if (id) {
      executeSearch({ variables: { id } }).then((data) => {
        setSubject(data.data.pagedSubjects.items[0]);
      });
    }
  }, [ id ]);

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
    <Flex gap="small" vertical>
      <Skeleton loading={!subject} active={true}>
        <Title level={3}>{subject?.title}</Title>
        <Title level={4}>{subject?.description}</Title>

        {(auth.user.role !== ROLE.STUDENT) && (
          <>
            <Title level={5}>Teachers ({subject?.teachers?.length || 0})</Title>
            <Table
              columns={teacher_config}
              dataSource={subject?.teachers as any || []}
              pagination={{ total: subject?.teachers?.length }}
            />
          </>
        )}
      </Skeleton>
    </Flex>
  );
};