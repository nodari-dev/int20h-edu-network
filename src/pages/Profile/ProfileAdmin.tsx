import {FC} from "react";
import {useAuthorization} from "../../hooks";
import {useTranslation} from "react-i18next";
import {Avatar, Col, Descriptions, Flex, Row, Space, Badge} from "antd";
import Title from "antd/es/typography/Title";
import {getInitials} from "../../utils";

interface IProps {}

const BADGES: any = {
	"Admin": "cyan",
	"SuperAdmin": "pink",
};

export const ProfileAdmin: FC<IProps> = (): JSX.Element => {
	const { user } = useAuthorization();
	const { t } = useTranslation();

	return (
			<Flex gap="small" vertical>
				<Flex justify="space-between" align="center">
					<Title>{t("account.title")}</Title>
				</Flex>
				<Row>
					<Col xs={24} sm={24} md={24} lg={12} xl={8}>
						<Space>
							<Badge.Ribbon text={user.role} color={BADGES[user.role || ""]}>
								<Avatar size={128} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
									<Title style={{ margin: 0 }}>{getInitials(user)}</Title>
								</Avatar>
							</Badge.Ribbon>
						</Space>
					</Col>
				</Row>
			</Flex>
	)
};
