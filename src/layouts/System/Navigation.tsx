import { FC } from "react";
import {Menu} from "antd";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {AppstoreOutlined, BookOutlined, FundOutlined, CalendarOutlined, MessageOutlined, CarryOutOutlined  ,MailOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {Role} from "../../models/user";

interface IProps {
	role: Role | null
}

export const Navigation: FC<IProps> = ({ role }: IProps): JSX.Element => {
	const location = useLocation();
	const {t} = useTranslation();

	function getItem(
			label: React.ReactNode,
			key?: React.Key | null,
			icon?: React.ReactNode,
			children?: MenuItem[],
	): MenuItem {
		return {
			key,
			icon,
			children,
			label,
		} as MenuItem;
	}

	const studentLinks = [
		getItem(<Link to="/">{t("sidebar.dashboard")}</Link>, "/", <AppstoreOutlined/>),
		getItem(<Link to="/subjects/all">Предмети</Link>, "/subjects/all", <FundOutlined/>),
		getItem(<Link to="/calendar">Календар</Link>, "/calendar", <CalendarOutlined />),
		getItem(<Link to="/assignments/all">Завдання</Link>, "/assignments/all", <CarryOutOutlined />)
	];

	const adminLinks = [
		getItem(<Link to="/">{t("sidebar.dashboard")}</Link>, "/", <AppstoreOutlined />),
		getItem("Учні", "/students", <UserOutlined />, [
			getItem(<Link to="/students/all">Усі</Link>, "/students/all"),
			getItem(<Link to="/students/create">Створити</Link>, "/students/create"),
		]),
		getItem("Вчителі","/teachers", <UserOutlined />, [
			getItem(<Link to="/teachers/all">Усі</Link>, "/teacher/all"),
			getItem(<Link to="/teachers/create">Створити</Link>, "/teachers/create"),
		]),
		getItem(t("sidebar.groups"), "/group", <TeamOutlined />, [
			getItem(<Link to="/group/all">{t("sidebar.all")}</Link>, "/group/all"),
			getItem(<Link to="/group/create">{t("sidebar.create")}</Link>, "/group/create"),
		]),
		getItem(<Link to="/analytics">{t("sidebar.analytics")}</Link>, "/analytics", <FundOutlined />),
		getItem(t("sidebar.newsletter"), "/newsletter", <MailOutlined />, [
			getItem(<Link to="/newsletter/all">{t("sidebar.all")}</Link>, "/newsletter/all"),
			getItem(<Link to="/newsletter/create">{t("sidebar.create")}</Link>, "/newsletter/create"),
		]),
		getItem("Предмети", "/subjects", <FundOutlined/>, [
			getItem(<Link to="/subjects/all">{t("sidebar.all")}</Link>, "/subjects/all"),
			getItem(<Link to="/subjects/create">{t("sidebar.create")}</Link>, "/subjects/create"),
		]),
	];

	const teacherLinks = [
		getItem(<Link to="/">{t("sidebar.dashboard")}</Link>, "/", <AppstoreOutlined />),
		getItem(<Link to="/students/all">Учні</Link>, "/users", <UserOutlined />),
		getItem(<Link to="/group/all">{t("sidebar.groups")}</Link>, "/group/all", <TeamOutlined />),
		getItem(<Link to="/analytics">{t("sidebar.analytics")}</Link>, "/analytics", <FundOutlined />),
		getItem(t("sidebar.newsletter"), "/newsletter", <MailOutlined />, [
			getItem(<Link to="/newsletter/all">{t("sidebar.all")}</Link>, "/newsletter/all"),
			getItem(<Link to="/newsletter/create">{t("sidebar.create")}</Link>, "/newsletter/create"),
		]),
		getItem(<Link to="/calendar">Календар</Link>, "/calendar", <CalendarOutlined />),
		getItem(<Link to="/subjects/all">Предмети</Link>, "/subjects", <FundOutlined/>),
		getItem('Завдання', "/assignments", <CarryOutOutlined />, [
			getItem(<Link to="/assignments/all">Усі</Link>, "/assignments"),
			getItem(<Link to="/assignments/create">Створити</Link>, "/assignments/create")
		]),
		getItem(<Link to="/journal">Журнал</Link>, "/journal", <BookOutlined/>),
		getItem(<Link to="/questions">Запитання</Link>, "/questions", <MessageOutlined /> ),
	];

	const userLinks = {
		ADMIN: adminLinks,
		TEACHER: teacherLinks,
		STUDENT: studentLinks
	};

	return (
			<Menu
			mode="inline"
			defaultSelectedKeys={[ location.pathname ]}
			defaultOpenKeys={[
				"" + userLinks[role].filter((link) => (location.pathname).split(link?.key as any).length === 2)?.[0]?.key || "",
			]}
			items={userLinks[role]}
	/>)
}