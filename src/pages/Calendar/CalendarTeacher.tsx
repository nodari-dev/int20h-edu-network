import { FC } from "react";
import {ROLE} from "../../models/user";
import {useAuthorization} from "../../hooks";
import {Calendar} from "antd";

interface IProps {}

export const CalendarTeacher: FC<IProps> = (): JSX.Element => {

  return (
      <Calendar />
  );
};