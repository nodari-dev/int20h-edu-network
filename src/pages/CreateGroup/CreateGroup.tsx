import { FC, useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useNotification } from "../../hooks";
import { useTableData } from "../Group/useTableData";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import TextArea from "antd/lib/input/TextArea";
import { INSTITUTES } from "../CreateTeacher/institutes";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface IProps {}

// TODO: UPDATE
const STUDENTS = gql`
  query userGroups($where: UserGroupEntityFilterInput) {
  userGroups(where:$where) {
      name
      id
  }
}
`;

// TODO: UPDATE
const SUBJECTS = gql`
  query userGroups($where: UserGroupEntityFilterInput) {
  userGroups(where:$where) {
      name
      id
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

export const CreateGroup: FC<IProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [ subjects, setSubjects ] = useState<any[]>([]);
  const [ students, setStudents ] = useState<any[]>([]);
  const [ create ] = useMutation(groupCreate);
  const [ getStudents ] = useLazyQuery(STUDENTS);
  const [ getSubjects ] = useLazyQuery(SUBJECTS);

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
      navigate("/group/all");
    });
  };

  const initialValues = {
    title: null,
    description: null,
    students: [],
    subjects: [],
    institute: [],
  };

  useEffect(() => {
    getStudents().then((data) => {
      setStudents(data.data.userGroups.map(({ id, name }: any) => ({
        value: id,
        label: name,
      })));
    });
    getSubjects().then((data) => {
      setSubjects(data.data.userGroups.map(({ id, name }: any) => ({
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
            <Title>{t("groups.createTitle")}</Title>
            <Form.Item name="title" label="Title" rules={[ { required: true } ]}>
              <Input />
            </Form.Item>
            <Form.Item required name="description" label="Description" rules={[ { required: true } ]}>
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item
              name="students"
              label="Students"
              rules={[ { required: true, type: "array" } ]}
            >
              <Select mode="multiple" allowClear options={students} />
            </Form.Item>
            <Form.Item
              name="subjects"
              label="Subjects"
              rules={[ { required: true, type: "array" } ]}
            >
              <Select mode="multiple" allowClear options={subjects} />
            </Form.Item>
            <Form.Item
              name="institute"
              label="Institute"
              rules={[ { required: true, type: "array" } ]}
            >
              <Select mode="multiple" allowClear options={INSTITUTES} />
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