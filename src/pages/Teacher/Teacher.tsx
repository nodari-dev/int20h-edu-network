import { FC } from "react";
import { Flex } from "antd";
import { useParams } from "react-router-dom";

interface IProps {}

export const Teacher: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();

  return (
    <Flex gap="small" vertical>
      Teacher {id}
    </Flex>
  );
};