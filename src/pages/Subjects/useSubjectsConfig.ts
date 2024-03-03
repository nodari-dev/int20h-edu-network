import { useTranslation } from "react-i18next";

export const useSubjectsConfig: any = ({ onView }: any) => {
  const { t } = useTranslation();

  return (
    [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },

      {
        title: "Description",
        dataIndex: "description",
        key: "description",
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