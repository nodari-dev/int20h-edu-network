import { FC, useEffect, useState } from "react";
import { Descriptions, Flex, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery } from "@apollo/client";
import Title from "antd/es/typography/Title";

interface IProps {}

const USER = gql`
  query users($id: String!) {
  pagedStudents(
    where: {
      id: {eq: $id}
    }
  ) {
    items{ 
    phoneNumber
    age
    email 
    fullName
    }
  }
}
`;

const tableData: any = {
  fullName: "fullName",
  phoneNumber: "phoneNumber",
  age: "age",
  email: "email"
};

export const Student: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [ user, setUser ] = useState<any>();
  const [ executeSearch ] = useLazyQuery(USER);

  useEffect(() => {
    if (id) {
      executeSearch({ variables: { id } }).then((data) => {
        setUser(data.data.students.items[0]);
      });
    }
  }, [ id ]);

  const items = user
    ? Object.keys(tableData).map((key: any) => ({
      key,
      label: tableData[key],
      children: user[key],
    }))
    : [];

  return (
    <Flex gap="small" vertical>
      <Skeleton loading={!user} active={true}>
        <Descriptions title={t(`user-info.title`)}>
          {items.map((item) => {
            if (item.key.includes("Date")) {
              return (
                <Descriptions.Item key={item.key} label={t(`user-info.${item.key}`)}>
                  {new Date(item.children).toLocaleString()}
                </Descriptions.Item>
              );
            }

            return (
              <Descriptions.Item key={item.key} label={t(`user-info.${item.key}`)}>
                {item.children}
              </Descriptions.Item>
            );
          })}
        </Descriptions>

        <Title level={5}>Grades (N/a)</Title>
        <div>add</div>

        <Title level={5}>Subjects (N/a)</Title>
        <div>add</div>

        <Title level={5}>Assignments (N/a)</Title>
        <div>add</div>
      </Skeleton>
    </Flex>
  );
};