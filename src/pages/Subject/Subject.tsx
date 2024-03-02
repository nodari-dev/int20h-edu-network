import { FC } from "react";
import { Flex } from "antd";
import { useParams } from "react-router-dom";

interface IProps {}

export const Subject: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();

  return (
    <Flex gap="small" vertical>
      Subject {id}
    </Flex>
  );
};