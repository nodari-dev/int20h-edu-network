import {FC} from "react";
import {DashboardAdmin} from "./DashboardAdmin";
import {DashboardStudent} from "./DashboardStudent";
import {DashboardTeacher} from "./DashboardTeacher";
import {useAuthorization} from "../../hooks";
import {ROLE} from "../../models/user";

interface IProps {}

export const Dashboard: FC<IProps> = (): JSX.Element => {
  const {user} = useAuthorization();

  const dashboards = {
    [ROLE.ADMIN]: <DashboardAdmin/>,
    [ROLE.TEACHER]: <DashboardTeacher/>,
    [ROLE.STUDENT]: <DashboardStudent/>
  };

  return dashboards[user.role];

};