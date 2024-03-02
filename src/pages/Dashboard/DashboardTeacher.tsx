import {FC, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Button, Card, Col, Flex, Row, Skeleton} from "antd";
import Title from "antd/es/typography/Title";
import {AnalyticsBar} from "./components/AnalyticsBar";
import {ColumnChart, LineChart, PieChart} from "../../components";
import {gql, useLazyQuery} from "@apollo/client";
import {useAuthorization} from "../../hooks";
import {FieldTimeOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

interface IProps {}

export const DashboardTeacher: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const {user} = useAuthorization();

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
          <Card title="Завдань виконано" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <Title>123</Title>
            </Skeleton>
          </Card>
        </Col>
      </Row>


      <Row gutter={[ 16, 16 ]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Title level={4}>Оцінки за тест: ...</Title>
          <Skeleton active={true} loading={loading}>
            <ColumnChart data={[]}  keyword={"asd"}/>
          </Skeleton>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={8}>

          <Title level={4}>Оцінки за тест: ...</Title>
          <Skeleton active={true} loading={loading}>
            <ColumnChart data={[]}  keyword={"asd"}/>
          </Skeleton>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Title level={4}>Оцінки за тест: ...</Title>
          <Skeleton active={true} loading={loading}>
            <ColumnChart data={[]}  keyword={"asd"}/>
          </Skeleton>
        </Col>
      </Row>
    </Flex>
  );
};