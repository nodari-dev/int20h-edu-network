import { FC, useEffect, useState } from "react";
import {Button, DatePicker, Flex, Form, Input, Select} from "antd";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const EXCHANGE_RATES = gql`
  query userGroups($where: GroupDtoFilterInput) {
  groups(where:$where) {
      title
      id
  }
}
`;

const emailCreate = gql`
      mutation createScheduledEmail($input: CreateScheduledEmailInput!) {
        createScheduledEmail(input: $input) {
          scheduledEmailDto{
            id
          }
        }
      }
  `;

interface IProps {}

export const CreateNewsletter: FC<IProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const [ groups, setGroups ] = useState<any[]>([]);
  const [ executeSearch ] = useLazyQuery(EXCHANGE_RATES);
  const [ create ] = useMutation(emailCreate);
  const handleCreate = (body: any) => {
    create({
      variables: {
        input: {
          command: {
            recipient: body.group,
            text: body.text,
            sendsAt: body.triggerAt,
            subject: body.subject
          },
        },
      },
    }).then(() => {
      navigate("/newsletter/all");
    });
  };

  useEffect(() => {
    executeSearch().then((data) => {
      setGroups(data.data.groups.map(({ id, title }: any) => ({
        value: id,
        label: title,
      })));
    });
  }, []);

  const initialValues = {
    group: null,
    subject: null,
    text: null,
    triggerAt: null,
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  return (
    <Flex gap="small" vertical>
      <Form
        layout="vertical"
        onFinish={handleCreate}
        initialValues={initialValues}
      >
        <Title>Створити розсилку</Title>
        <Form.Item name="group" label="Група" rules={[ { required: true } ]}>
          <Select
            placeholder="Група"
            allowClear
          >
            {groups.map(({ value, label }) => {
              return <Option value={value}>{label}</Option>;
            })}

          </Select>
        </Form.Item>
        <Form.Item required name="subject" label="Тема" >
          <Input placeholder="Тема" />
        </Form.Item>
        <Form.Item required name="text" label="Content" >
          <TextArea rows={8} placeholder="Content" />
        </Form.Item>
        <Form.Item name="triggerAt" label="Запланований термім" rules={[ { required: true } ]}>
          <DatePicker
            disabledDate={disabledDate}
            showTime format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Flex gap={"small"} vertical style={{ width: "100%" }}>
          <Form.Item>
            <Button htmlType="submit">Запланувати</Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};