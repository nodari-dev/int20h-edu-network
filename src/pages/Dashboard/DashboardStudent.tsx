import { FC } from "react";
import { Button, Card, Col, Flex, Row, Skeleton, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { useAuthorization } from "../../hooks";
import { CheckCircleOutlined, FieldTimeOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

interface IProps {}

export const DashboardStudent: FC<IProps> = (): JSX.Element => {
  const { user } = useAuthorization();
  const data = false;
  const loading = data;

  return (
    <Flex gap={"small"} vertical>
      <Title>Привіт {user.name} {user.lastName}</Title>

      <Title level={3}>Upcoming tests</Title>
      <Row gutter={[ 16, 16 ]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card
            title="Предмет: Практичнa" style={{ width: "100%" }} extra={
            <Flex align="center" justify={"center"} gap={"6px"}>
              <FieldTimeOutlined />
              <Text>Виконати до: <strong></strong></Text>
            </Flex>
          }
          >
            <Skeleton loading={loading} active={true}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
              <Button type="primary"><Link to={"123"}>Виконати</Link></Button>
            </Skeleton>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card
            title="Предмет: Практичнa" style={{ width: "100%" }} extra={
            <Flex align="center" justify={"center"} gap={"6px"}>
              <FieldTimeOutlined />
              <Text>Виконати до: <strong></strong></Text>
            </Flex>
          }
          >
            <Skeleton loading={loading} active={true}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
              <Button type="primary"><Link to={"123"}>Виконати</Link></Button>
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card
            title="Предмет: Практичнa" style={{ width: "100%" }} extra={
            <Flex align="center" justify={"center"} gap={"6px"}>
              <FieldTimeOutlined />
              <Text>Виконати до: <strong></strong></Text>
            </Flex>
          }
          >
            <Skeleton loading={loading} active={true}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
              <Button type="primary"><Link to={"123"}>Виконати</Link></Button>
            </Skeleton>
          </Card>
        </Col>
      </Row>


      <Title level={3}>Completed tests</Title>
      <Row gutter={[ 16, 16 ]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card title="Предмет: Практичнa" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
              <Paragraph
                strong copyable={{
                icon: [ <CheckCircleOutlined /> ],
              }}
              >
                Оцінка: 3/100
              </Paragraph>
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card title="Практична з біології" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
              <Paragraph
                strong copyable={{
                icon: [ <CheckCircleOutlined /> ],
              }}
              >
                Оцінка: 3/100
              </Paragraph>
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card title="Математика на 3 зі 100" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
              <Paragraph
                strong copyable={{
                icon: [ <CheckCircleOutlined /> ],
              }}
              >
                Оцінка: 3/100
              </Paragraph>
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};