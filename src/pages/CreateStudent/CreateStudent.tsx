import { FC, useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import { INSTITUTES } from "../CreateTeacher/institutes";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IProps {}

const studentsCreate = gql`
      mutation CreateUserGroup($input:  CreateStudentsInput!) {
        createStudents(input: $input) {
        boolean
        }
      }
  `;

const GROUPS = gql`
  query userGroups($where: GroupDtoFilterInput) {
  groups(where:$where) {
      title
      id
  }
}
`;

export const CreateStudent: FC<IProps> = (): JSX.Element => {
  const [ create ] = useMutation(studentsCreate);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [ groups, setGroups ] = useState([]);
  const [ findGroups ] = useLazyQuery(GROUPS);

  const handleCreate = (body: any) => {
    create({
      variables: {
        input: {
          commands: body.users,
        },
      },
    }).then(() => {
      navigate("/students/all");
    });
  };

  const initialValues = {
    users: [],
  };

  useEffect(() => {
    findGroups().then((data) => {
      console.log(data.data.groups);
      setGroups(data.data.groups.map(({ id, title }: any) => ({
        value: id,
        label: title,
      })));
    });
  }, []);

  return (

    <Flex gap="small" vertical>
      <Form
        layout="vertical"
        onFinish={handleCreate}
        initialValues={initialValues}
      >
        <Title>Create users</Title>
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
                <Flex key={key} style={{ width: "100%", marginBottom: 8 }} gap={8} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[ name, "fullName" ]}
                      style={{ width: "100%" }}
                      label="Full Name"
                      rules={[ { required: true, message: "Missing title" } ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[ name, "email" ]}
                      style={{ width: "100%" }}
                      label="Email"
                      rules={[
                        { type: "email", message: "Incorrect email!" },
                        { required: true, message: "Missing email" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[ name, "age" ]}
                      style={{ width: "100%" }}
                      label="Age"
                      rules={[ { required: true, type: "number", message: "Missing Age" } ]}
                    >
                      <InputNumber min={17 as any} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[ name, "phoneNumber" ]}
                      style={{ width: "100%" }}
                      label="Phone Number"
                      rules={[
                        { required: true, message: "Missing Phone Number" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[ name, "password" ]}
                      style={{ width: "100%" }}
                      label="Password"
                      rules={[
                        { required: true, message: "Password" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[ name, "groupId" ]}
                      style={{ width: "100%" }}
                      label="Group"
                      rules={[ { required: true } ]}
                    >
                      <Select allowClear options={groups} />
                    </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Flex>
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
            <Button htmlType="submit">{t("Create")}</Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};