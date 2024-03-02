import React, { FC, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { Avatar, Button, Flex, Layout, Select } from "antd";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useAuthorization } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { constants } from "../../styles/constants";
import "./navigation.css";
import { getInitials } from "../../utils";
import {Navigation} from "./Navigation";

const { Header, Content, Sider } = Layout;

const LANGUAGES: any = {
  en: { nativeName: "En" },
  ua: { nativeName: "Ua" },
};

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const System: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const { user } = useAuthorization();
  const [ collapsed, setCollapsed ] = useState(false);
  const [ hasBreakPoint, setBreakPoint ] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resetAuthorization } = useAuthorization();

  const langOptions: { value: string, label: string }[] = Object.keys(LANGUAGES)
    .map((lng) => ({ value: lng, label: LANGUAGES[lng].nativeName }));

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsedWidth={hasBreakPoint ? "0" : "80"}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
          setBreakPoint(broken);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          backgroundColor: constants.white,
          borderRight: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Flex style={{ height: "100%" }} vertical>
          <div className="logo-container">
            <img className="logo" src="./public/logo.png" alt="Logo" />
          </div>

          <Flex style={{ height: "100%" }} vertical justify="space-between">
            <Navigation role={user.role} />
            {collapsed
              ? <Button
                style={{ margin: "0 4px 16px 4px", alignSelf: "center" }}
                onClick={resetAuthorization}
                icon={<LogoutOutlined />}
                shape={collapsed ? "circle" : "default"}
              />
              : <Button
                style={{ margin: "0 4px 16px 4px" }}
                onClick={resetAuthorization}
                icon={<LogoutOutlined />}
              >{t("sidebar.logout")}</Button>
            }
          </Flex>
        </Flex>
      </Sider>
      <Layout style={{ maxHeight: "100vh" }}>
        <Header
          style={{
            padding: "0 16px 0 0",
            background: constants.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: constants.brown,
              fontSize: "16px",
              width: 48,
              height: 48,
            }}
          />
          <Flex gap={16} align="center">
            <Select
              defaultValue={i18n.resolvedLanguage}
              style={{ width: 60 }}
              onChange={handleChange}
              options={langOptions}
            />
            <Avatar
              size={32}
              style={{ cursor: "pointer", fontSize: 16 }}
              onClick={() => navigate("/profile")}
            >{getInitials(user)}</Avatar>
          </Flex>
        </Header>
        <Content style={{ margin: "24px 16px", maxHeight: "100%" }}>
          <div style={{ padding: 16, height: "100%", overflowY: "auto", background: constants.white }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
