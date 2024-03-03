import { FC, useEffect, useState } from "react";
import { Descriptions, Flex, Skeleton} from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery } from "@apollo/client";

interface IProps {}

const line = gql`
  query pagedScheduledMessages($id: UUID!) {
  pagedScheduledEmails(
    where: {
      id: {eq: $id}
    }
  ) {
    totalCount
    items {
      id
      sendsAt
      text
      recipient
      subject
    }
  }
}
`;

export const Newsletter: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [ groupData, setGroupData ] = useState<any>();
  const [ executeSearch ] = useLazyQuery(line);

  useEffect(() => {
    if (id) {
      executeSearch({ variables: { id } }).then((data) => {
        console.log(data)
        setGroupData(data.data.pagedScheduledEmails?.items[0]);
      });
    }
  }, [ id ]);

  return (
    <Flex vertical>
      <Skeleton loading={!groupData} active={true}>
        <Descriptions title={"Інормація про розсилку"}>
          <Descriptions.Item key={groupData?.id} label={t(`Id`)}>
            {groupData?.id}
          </Descriptions.Item>
          <Descriptions.Item key={groupData?.text} label={"Текст"}>
            {groupData?.text}
          </Descriptions.Item>
          <Descriptions.Item key={groupData?.text} label={"Тема"}>
            {groupData?.subject}
          </Descriptions.Item>
          <Descriptions.Item key={"Trigger At"} label={t(`Trigger At`)}>
            {(new Date(groupData?.triggerAt)).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </Skeleton>
    </Flex>
  );
};