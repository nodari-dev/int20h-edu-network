import { FC } from "react";
import { Card, Col, Flex, Row, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { ColumnChart, PieChart } from "../../components";
import { useAuthorization } from "../../hooks";

interface IProps {}

export const DashboardAdmin: FC<IProps> = (): JSX.Element => {
  const { user } = useAuthorization();

  const data = undefined;
  const loading = !data;

  return (
    <Flex gap={"small"} vertical>
      <Title>Добрий день {user.name} {user.lastName}</Title>
      <Row gutter={[ 16, 16 ]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card title="Усього учнів" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <Title>123</Title>
            </Skeleton>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card title="Загальна кількість груп" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <Title>123</Title>
            </Skeleton>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card title="Загальна кількість вчителів" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <Title>123</Title>
            </Skeleton>
          </Card>
        </Col>
      </Row>

      <Row gutter={[ 16, 16 ]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Title level={4}>Співвідношення учнів до вчителів</Title>
          <Skeleton active={true} loading={loading}>
            <PieChart data={[]} keyword={"asd"} />
          </Skeleton>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Title level={4}>Виконані на невиконані завдання</Title>
          <Skeleton active={true} loading={loading}>
            <ColumnChart data={[]} keyword={"asd"} />
          </Skeleton>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Title level={4}>Оцінки учнів</Title>
          <Skeleton active={true} loading={loading}>
            <ColumnChart data={[]} keyword={"asd"} />
          </Skeleton>
        </Col>
      </Row>
    </Flex>
  );
};