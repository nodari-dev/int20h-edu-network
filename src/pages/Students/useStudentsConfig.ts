import { useTranslation } from "react-i18next";

export const useStudentsConfig: any = ({ onView }: any) => {
  const { t } = useTranslation();
  return (
    [
      {
        title: "Full Name",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        align: "left",
        key: "phoneNumber",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Institute",
        dataIndex: "institute",
        key: "institute",
      },
      {
        title: "Group",
        dataIndex: "group",
        key: "group",
      },
      {
        title: t("users.actions"),
        dataIndex: "",
        key: "x",
        fixed: "right",
        width: "100px",
        align: "center",
        render: (record: any) => onView(record),
      },
    ]
  );
};