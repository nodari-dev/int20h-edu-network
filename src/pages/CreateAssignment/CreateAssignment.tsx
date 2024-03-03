import { FC, useEffect, useState } from "react";
import { Button, DatePicker, Flex, Form, Input, InputNumber, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

interface IProps {}

const studentsCreate = gql`
      mutation CreateUserGroup($input:  CreateTestInput!) {
        createTest(input: $input) {
        testDto {
            id
          }
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

export const CreateAssignment: FC<IProps> = (): JSX.Element => {
  const [ create ] = useMutation(studentsCreate);
  const navigate = useNavigate();

  const [ groups, setGroups ] = useState([]);
  const [ findGroups ] = useLazyQuery(GROUPS);

  useEffect(() => {
    findGroups().then((data) => {
      setGroups(data.data.groups.map(({ id, title }: any) => ({
        value: id,
        label: title,
      })));
    });
  }, []);

  const handleCreate = (body: any) => {
    create({
      variables: {
        input: {
          command: {
            closesAt: new Date(body.time[1].$d).toISOString(),
            opensAt: new Date(body.time[0].$d).toISOString(),
            description: body.description,
            title: body.title,
            groupId: body.groupId,
            createQuestionCommands: body.createQuestionCommands.map((c) => ({
              ...c,
              createCorrectAnswerCommand: { value: c.createCorrectAnswerCommand },
            })),
          },
        },
      },
    }).then(() => {
      navigate("/subjects/all");
    });
  };

  const initialValues = {
    title: null,
    description: null,
    time: null,
    groupId: null,
    createQuestionCommands: [],
  };

  return (
    <Flex gap="small" vertical>
      <Form
        layout="vertical"
        onFinish={handleCreate}
        initialValues={initialValues}
      >
        <Title>Create Test</Title>
        <Form.Item name="title" label="Title" rules={[ { required: true } ]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[ { required: true } ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="groupId"
          label="Group"
          rules={[ { required: true } ]}
        >
          <Select allowClear options={groups} />
        </Form.Item>
        <Form.Item name="time" label="time" rules={[ { required: true } ]}>
          <RangePicker showTime />
        </Form.Item>
        <Form.List
          name="createQuestionCommands"
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
                    name={[ name, "title" ]}
                    style={{ width: "100%" }}
                    label="Title"
                    rules={[ { required: true, message: "Missing title" } ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[ name, "createCorrectAnswerCommand" ]}
                    style={{ width: "100%" }}
                    label="Correct Answer"
                    rules={[ { required: true, message: "Missing title" } ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[ name, "points" ]}
                    style={{ width: "100%" }}
                    label="Points for this question"
                    rules={[ { required: true, message: "Missing points" } ]}
                  >
                    <InputNumber min={1 as any} />
                  </Form.Item>
                  <Form.Item label="Answers">
                    <Form.List name={[ name, "createAnswerCommands" ]}>
                      {(subFields, subOpt) => (
                        <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item noStyle name={[ subField.name, "value" ]}>
                                <Input placeholder="Answer" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button type="dashed" onClick={() => subOpt.add()} block>
                            + Add answer
                          </Button>
                        </div>
                      )}
                    </Form.List>
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
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};