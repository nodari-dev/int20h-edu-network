import { FC, useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { INSTITUTES } from "./institutes";
import axios from "axios";

interface IProps {}

const GROUPS = gql`
  query userGroups($where: GroupDtoFilterInput) {
  groups(where:$where) {
      title
      id
  }
}
`;

const SUBJECTS = gql`
  query userGroups($where: SubjectDtoFilterInput) {
  subjects(where:$where) {
      title
      id
  }
}
`;

export const CreateTeacher: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([])
  const [subjects, setSubjects] = useState([])
  const [ findGroups ] = useLazyQuery(GROUPS);
  const [ findSubjects ] = useLazyQuery(SUBJECTS);

  useEffect(() => {
    findGroups().then((data) => {
      setGroups(data.data.groups.map(({ id, title }: any) => ({
        value: id,
        label: title,
      })));
    });

    findSubjects().then((data) => {
      setSubjects(data.data.subjects.map(({ id, title }: any) => ({
        value: id,
        label: title,
      })));
    });
  }, []);

  const initialValues = {
    fullName: null,
    email: null,
    password: null,
    groupIds: [],
    subjectIds: []
  };

  const handleCreate = (body: any) => {
    axios.post('https://jwp-team.com/backend/api/teachers/sign-up', body).then(() => {
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
            <Form.Item name="password" label="Password" rules={[ { required: true } ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="groupIds"
              label="Groups"
              rules={[ { required: true, type: "array" } ]}
            >
              <Select mode="multiple" allowClear options={subjects} />
            </Form.Item>
            <Form.Item
              name="subjectIds"
              label="Subjects"
              rules={[ { required: true, type: "array" } ]}
            >
              <Select mode="multiple" allowClear options={groups} />
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