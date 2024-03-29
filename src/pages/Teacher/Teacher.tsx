import { FC, useEffect, useState } from "react";
import { Descriptions, Flex, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

interface IProps {}
// TODO: UPDATE
const USER = gql`
  query users($id: String!) {
  pagedUsers(
    where: {
      id: {eq: $id}
    }
  ) {
    totalCount
    items {
      age
      email
      fullName
      phoneNumber
      id
      role
    }
  }
}
`;

const tableData: any = {
  fullName: "fullName",
  phoneNumber: "phoneNumber",
  age: "age",
  role: "role",
  email: "email"
};

export const Teacher: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [ user, setUser ] = useState<any>();
  const [ executeSearch ] = useLazyQuery(USER);

  useEffect(() => {
    if (id) {
      executeSearch({ variables: { id } }).then((data) => {
        setUser(data.data.pagedUsers.items[0]);
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
      </Skeleton>
    </Flex>
  );
};