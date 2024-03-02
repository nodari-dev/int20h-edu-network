import { FC, useEffect, useState } from "react";
import { Descriptions, Flex, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery } from "@apollo/client";

interface IProps {}

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
  botTypes: "botTypes",
  region: "region",
  type: "type",
  registrationDate: "registrationDate",
};

export const Student: FC<IProps> = (): JSX.Element => {
  const { userId } = useParams();
  const { t } = useTranslation();
  const [ user, setUser ] = useState<any>();
  const [ executeSearch ] = useLazyQuery(USER);

  useEffect(() => {
    if (userId) {
      executeSearch({ variables: { id: userId } }).then((data) => {
        setUser(data.data.pagedUsers.items[0]);
      });
    }
  }, [ userId ]);

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