import { FC } from "react";
import { Button, Col, Flex, Form, Input, Row, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import { INSTITUTES } from "../CreateTeacher/institutes";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IProps {}

const studentsCreate = gql`
      mutation CreateUserGroup($input:  CreateUserGroupInput!) {
        createUserGroup(input: $input) {
        userGroupEntity {
          id
          }
        }
      }
  `;

export const CreateStudent: FC<IProps> = (): JSX.Element => {
  const [ create ] = useMutation(studentsCreate);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCreate = (body: any) => {
    create({
      variables: {
        input: {
          command: {
            fullName: body.title,
            email: body.email,
            phone: body.phone,
            institute: body.institute,
            group: body.group,
          },
        },
      },
    }).then(() => {
      navigate("/students/all");
    });
  };

  const initialValues = {
    users: []
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
            <Title>{t("groups.createTitle")}</Title>
            <Form.List
              name="users"
              rules={[
                {
                  validator: async (_, lots) => {
                    if (!lots || lots.length < 1) {
                      return Promise.reject(new Error("At least 1 user"));
                    }
                  },
                },
              ]}

            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[ name, "fullName" ]}
                        label="Full Name"
                        rules={[ { required: true, message: "Missing title" } ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[ name, "email" ]}
                        label="Email"
                        rules={[ { type: "email", message: "Incorrect email!" }, { required: true, message: "Missing email" } ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[ name, "institute" ]}
                        label="Institute"
                        rules={[ { required: true, type: "array" } ]}
                      >
                        <Select mode="multiple" allowClear options={INSTITUTES} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[ name, "group" ]}
                        label="Group (optional)"
                      >
                        <Select mode="multiple" allowClear options={INSTITUTES} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add User
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
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