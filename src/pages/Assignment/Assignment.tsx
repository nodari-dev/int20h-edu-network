import { FC } from "react";
import { Flex } from "antd";
import { useParams } from "react-router-dom";
import {Centrifuge} from "centrifuge";

interface IProps {}

export const Assignment: FC<IProps> = (): JSX.Element => {
  const { id } = useParams();

  const centrifuge = new Centrifuge('wss://jwp-team.com/centrifugo/connection/websocket');

  const testOpenSub = centrifuge.newSubscription('tests.opened');

  const testClosedSub = centrifuge.newSubscription('tests.closed');

  testOpenSub.on('publication', function(ctx) {
    console.log(ctx.data);
  });

  testClosedSub.on('publication', function(ctx) {
    console.log(ctx.data);
  });

  testOpenSub.subscribe();
  testClosedSub.subscribe();

  centrifuge.connect();

  return (
    <Flex gap="small" vertical>
      Assignment {id}
    </Flex>
  );
};