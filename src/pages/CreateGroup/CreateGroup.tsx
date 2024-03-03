import { FC, useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface IProps {}


const INSTITUTES = gql`
  query institutes($where: InstituteDtoFilterInput) {
  institutes(where:$where) {
      title
      id
  }
}
`;

const groupCreate = gql`
      mutation CreateGroup($input:  CreateGroupInput!) {
        createGroup(input: $input) {
        groupDto {
          id
          }
        }
      }
  `;

export const CreateGroup: FC<IProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [ institutes, setInstitutes ] = useState<any[]>([]);
  const [ create ] = useMutation(groupCreate);
  const [ getInstitutes ] = useLazyQuery(INSTITUTES);

  const handleCreate = (body: any) => {
    create({
      variables: {
        input: {
          command: {
            title: body.title,
            instituteId: body.instituteId,
          },
        },
      },
    }).then(() => {
      navigate("/group/all");
    });
  };

  const initialValues = {
    title: null,
    institute: null,
  };

  useEffect(() => {
    getInstitutes().then((data) => {
      setInstitutes(data.data.institutes.map(({ id, title }: any) => ({
        value: id,
        label: title,
      })));
    });
  }, []);

  return (

    <Flex gap="small" vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={16} xl={8}>
          <Form
            layout="vertical"
            onFinish={handleCreate}
            initialValues={initialValues}
          >
            <Title>{t("groups.createTitle")}</Title>
            <Form.Item name="title" label="Title" rules={[ { required: true } ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="instituteId"
              label="Institute"
              rules={[ { required: true } ]}
            >
              <Select allowClear options={institutes} />
            </Form.Item>
            <Flex gap={"small"} vertical style={{ width: "100%" }}>
              <Form.Item>
                <Button htmlType="submit">{t("Create")}</Button>
              </Form.Item>
            </Flex>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
};