import { FC, useState } from "react";
import { useAuthorization, useLoader, useNotification } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Result, Segmented } from "antd";
import { useTranslation } from "react-i18next";
import { constants } from "../../styles/constants";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { ROLE } from "../../models/user";

interface IProps {}

export const SignIn: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loader = useLoader();
  const [ role, setRole ] = useState<any>("Студент");
  const notification = useNotification();
  const { isAuthorized, setAuthorization } = useAuthorization();

  const onFinish = (values: any) => {
    const signIn = loader.create(t("signIn.loader.title"));
    signIn.start();
    let url: string = "https://jwp-team.com/backend/api/students/sign-in";

    if (role === "Викладач") {
      url = "https://jwp-team.com/backend/api/teachers/sign-in";
    }

    if (role === "Адміністратор") {
      url = "https://jwp-team.com/backend/api/admin/sign-in";
    }

    axios.post(url, { ...values })
      .then(({ data }: any) => {
        if (role === "Викладач") {
          setAuthorization({ ...data.teacher, role: "TEACHER" }, data.accessToken);
        }

        if (role === "Адміністратор") {
          setAuthorization({ ...data.admin, role: "ADMIN" }, data.accessToken);
        }

        if (role === "Студент") {
          setAuthorization({ ...data.student, role: "STUDENT" }, data.accessToken);
        }

        navigate("/");
        signIn.stop();
      }).catch(() => {
      signIn.stop();
      notification.error("Wrong credentials !");
    });
  };

  const cred = {
    "Викладач": {
      login: "daniel.hrovinsky@gmail.com",
      pass: "superteacher",
      role: ROLE.TEACHER,
    },
    "Студент": {
      login: "nodar22@gmai.com",
      pass: "1",
      role: ROLE.STUDENT,
    },
    "Адміністратор": {
      login: "admin@gmail.com",
      pass: "superpower",
      role: ROLE.ADMIN,
    },
  };

  return !isAuthorized ? (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Flex vertical gap={5} style={{ marginBottom: 24 }}>
          <Title>Увійти як </Title>
          <Segmented
            options={[ "Викладач", "Студент", "Адміністратор" ]}
            size="small"
            onChange={setRole}
            value={role}
          />
          <Title level={5}>Login: {cred[role].login} Password: {cred[role].pass}</Title>
        </Flex>


        <Form.Item
          name="email"
          rules={[
            { type: "email", message: t("signIn.email.validation.email") },
            { required: true, message: t("signIn.email.validation.required") },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t("signIn.email.title")} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[ { required: true, message: t("signIn.password.validation.required") } ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("signIn.password.title")}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("signIn.remember.title")}</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Flex gap="small" align="center">
            <Button
              style={{ background: constants.black }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {t("signIn.navigation.logIn")}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  ) : (
    <Flex style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
      <Result
        icon={<SmileOutlined style={{ color: constants.black }} />}
        title={t("signIn.authorized.title")}
        extra={
          <Link to="/"><Button
            type="primary"
            style={{ background: constants.black }}
          >{t("signIn.authorized.goHome")}</Button></Link>
        }
      />
    </Flex>
  );
};
