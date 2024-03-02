import { FC } from "react";
import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { INSTITUTES } from "./institutes";

interface IProps {}
// TODO: UPDATE
const teacherCreate = gql`
      mutation scheduleMessage($input:  ScheduleMessageInput!) {
        scheduleMessage(input: $input) {
          boolean
        }
      }
  `;

export const CreateTeacher: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ create ] = useMutation(teacherCreate);

  const initialValues = {
    fullName: null,
    email: null,
    institute: [],
    description: null,
  };

  const handleCreate = (body: any) => {
    create({
      variables: {
        input: {
          command: {
            fullName: body.fullName,
            email: body.email,
            institute: body.institute,
            description: body.description,
          },
        },
      },
    }).then(() => {
      navigate("/teachers/all");
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
            <Title>Add new teacher</Title>
            <Form.Item name="fullName" label="Full Name" rules={[ { required: true } ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: "email", message: t("signIn.email.validation.email") },
                { required: true, message: t("signIn.email.validation.required") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="institute"
              label="Institute"
              rules={[ { required: true, type: "array" } ]}
            >
              <Select mode="multiple" allowClear options={INSTITUTES} />
            </Form.Item>
            <Form.Item required name="description" label="Description" rules={[ { required: true } ]}>
              <TextArea rows={2} />
            </Form.Item>
            <Flex gap={"small"} vertical style={{ width: "100%" }}>
              <Form.Item>
                <Button htmlType="submit">{t("Schedule")}</Button>
              </Form.Item>
            </Flex>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
};