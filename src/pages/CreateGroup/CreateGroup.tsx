import { FC, useState } from "react";
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useNotification } from "../../hooks";
import { useTableData } from "../Group/useTableData";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const { Option } = Select;

interface IProps {}

export const CreateGroup: FC<IProps> = (): JSX.Element => {
  const notification = useNotification();
  const { tableLabels } = useTableData();
  const { t } = useTranslation();

  const usersGQL = gql`
      query Users($where: UserEntityFilterInput, $order: [UserEntitySortInput!]) {
        users(where: $where, order: $order) {
          phoneNumber
          fullName
          age
          region
          type
          registrationDate
          botTypes
        }
      }
  `;

  const groupCreate = gql`
      mutation CreateUserGroup($input:  CreateUserGroupInput!) {
        createUserGroup(input: $input) {
        userGroupEntity {
          id
          }
        }
      }
  `;

  const [ getUsers, { data } ] = useLazyQuery(usersGQL);
  const [ create ] = useMutation(groupCreate);
  const [ title, setTitle ] = useState();

  const initialValues = {
    name: null,
    region: "",
    minAge: 0,
    maxAge: 100,
    bot: "",
  };

  const findUsers = (body: any) => {
    try {
      setTitle(body.name);
      getUsers({
        variables: {
          where: {
            age: {
              gte: body.minAge,
              ngt: body.maxAge,
            },
            region: {
              contains: body.region,
            },
            type: {
              eq: body.type,
            },
            botTypes: {
              some: { contains: body.bot },
            },
          },
          order: [
            {
              registrationDate: "DESC",
            },
          ],
        },
      });
    } catch (e: any) {
      notification.error(e);
    }
  };

  const createGroup = () => {
    if (!!data?.users) {
      const phones = data?.users.map((user: any) => user?.phoneNumber);
      create({ variables: { input: { command: { title, usersPhoneNumbers: phones } } } });
    }
  };

  return (

    <Flex gap="small" vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={16} xl={8}>
          <Form
            layout="vertical"
            onFinish={findUsers}
            initialValues={initialValues}
          >
            <Title>{t("groups.createTitle")}</Title>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
};