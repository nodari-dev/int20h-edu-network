import { FC } from "react";
import { useAuthorization } from "../hooks";
import { AccessDenied } from "../pages";
import { Role } from "../models/user";

type TWithCheckRole =
  <T>(Component: FC<JSX.IntrinsicAttributes & T>, role: Role[] | Role) => FC<JSX.IntrinsicAttributes & T>;

export const withCheckRole: TWithCheckRole = (Page, role) => {
  return (props) => {
    const { user } = useAuthorization();

    if (user?.role && !role.includes(user.role) || !user?.role) {
      return <AccessDenied />;
    }

    return <Page {...props} />;
  };
};