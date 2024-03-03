import { FC } from "react";
import { Button, Col, Flex, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Title from "antd/es/typography/Title";
import TextArea from "antd/lib/input/TextArea";

interface IProps {}

const subjectCreate = gql`
      mutation subject($input:  CreateSubjectInput!) {
        createSubject(input: $input) {
        subjectDto {
            id
          }
        }
      }
  `;

export const CreateSubject: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ create ] = useMutation(subjectCreate);

  const initialValues = {
    title: null,
    description: null,
  };

  const handleCreate = (body: any) => {
    create({
      variables: {
        input: {
          command: {
            title: body.title,
            description: body.description,
          },
        },
      },
    }).then(() => {
      navigate("/subjects/all");
    });
  };

  return (
    <Flex gap="small" vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={16} xl={8}>
          <Form
            layout="vertical"
            onFinish={handleCreate}
            initialValues={initialValues}
          >
            <Title>Create Subject</Title>
            <Form.Item name="title" label="Title" rules={[ { required: true } ]}>
              <Input />
            </Form.Item>
            <Form.Item required name="description" label="Description" rules={[ { required: true } ]}>
              <TextArea rows={2} />
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