import { FC } from "react";
import {ROLE} from "../../models/user";
import {ProfileAdmin} from "./ProfileAdmin";
import {useAuthorization} from "../../hooks";
import {ProfileStudent} from "./ProfileStudent";

interface IProps {}

export const Profile: FC<IProps> = (): JSX.Element => {
  const { user } = useAuthorization();

  const profiles = {
    [ROLE.ADMIN]: <ProfileAdmin/>,
    [ROLE.TEACHER]: <p>кладмен підор</p>,
    [ROLE.STUDENT]: <ProfileStudent/>
  };

  return profiles[user.role];
};