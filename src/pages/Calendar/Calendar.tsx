import { FC } from "react";
import {ROLE} from "../../models/user";
import {useAuthorization} from "../../hooks";
import {CalendarTeacher} from "./CalendarTeacher";
import {CalendarStudent} from "./CalendarStudent";

interface IProps {}

export const Calendar: FC<IProps> = (): JSX.Element => {
  const {user} = useAuthorization();

  const profiles = {
    [ROLE.TEACHER]: <CalendarTeacher/>,
    [ROLE.STUDENT]: <CalendarStudent/>
  };
  //@ts-ignore
  return profiles[user.role];
};