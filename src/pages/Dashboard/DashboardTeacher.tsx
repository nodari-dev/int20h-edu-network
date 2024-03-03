import { FC } from "react";
import { Card, Col, Flex, Row, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { ColumnChart } from "../../components";
import { gql, useQuery } from "@apollo/client";
import { useAuthorization } from "../../hooks";

const STUDENTS = gql`
  query students( $sorters: [StudentDtoSortInput!] ) {
  students(
    order: $sorters
  ) {
      age
      email
      fullName
      phoneNumber
      id
      createdAt 
      groupId
  }
}
`;

interface IProps {}

export const DashboardTeacher: FC<IProps> = (): JSX.Element => {
  const { user } = useAuthorization();
  const { data, loading } = useQuery(STUDENTS);

  const students = data?.students

  return (
    <Flex gap={"small"} vertical>
      <Title>Добрий день {user.name} {user.lastName}</Title>
      <Row gutter={[ 16, 16 ]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card title="Усього учнів" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <Title>{students?.length}</Title>
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
            <ColumnChart data={[]} keyword={"asd"} />
          </Skeleton>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={8}>

          <Title level={4}>Оцінки за тест: ...</Title>
          <Skeleton active={true} loading={loading}>
            <ColumnChart data={[]} keyword={"asd"} />
          </Skeleton>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Title level={4}>Оцінки за тест: ...</Title>
          <Skeleton active={true} loading={loading}>
            <ColumnChart data={[]} keyword={"asd"} />
          </Skeleton>
        </Col>
      </Row>
    </Flex>
  );
};