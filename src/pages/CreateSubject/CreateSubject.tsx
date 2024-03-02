import { FC, useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Title from "antd/es/typography/Title";
import TextArea from "antd/lib/input/TextArea";

interface IProps {}

// TODO: UPDATE
const getTeachers = gql`
  query userGroups($where: UserGroupEntityFilterInput) {
  userGroups(where:$where) {
      name
      id
  }
}
`;

// TODO: UPDATE
const subjectCreate = gql`
      mutation scheduleMessage($input:  ScheduleMessageInput!) {
        scheduleMessage(input: $input) {
          boolean
        }
      }
  `;

export const CreateSubject: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ teachers, setTeachers ] = useState<any[]>([]);
  const [ create ] = useMutation(subjectCreate);
  const [ executeSearch ] = useLazyQuery(getTeachers);

  const initialValues = {
    title: null,
    description: null,
    teachers: [],
  };

  const handleCreate = (body: any) => {
    create({
      variables: {
        input: {
          command: {
            title: body.title,
            teachers: body.teachers,
            description: body.description,
          },
        },
      },
    }).then(() => {
      navigate("/subjects/all");
    });
  };

  useEffect(() => {
    executeSearch().then((data) => {
      setTeachers(data.data.userGroups.map(({ id, name }: any) => ({
        value: id,
        label: name,
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
            <Title>Create Subject</Title>
            <Form.Item name="title" label="Title" rules={[ { required: true } ]}>
              <Input />
            </Form.Item>
            <Form.Item required name="description" label="Description" rules={[ { required: true } ]}>
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item
              name="teachers"
              label="Teachers"
              rules={[ { required: true, message: "Please select your favourite colors!", type: "array" } ]}
            >
              <Select mode="multiple" allowClear options={teachers} />
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