import { useDispatch } from "react-redux";
import { useStore } from "./useStore";
import { RST_AUTHORIZATION, SET_AUTHORIZATION, SET_USER } from "../store/authorization/authorization.actions";
import { useLoader } from "./useLoader";
import { IUser } from "../models";

type TUseAuthorization = () => {
  isAuthorized: boolean;
  accessToken: string;
  user: IUser;
  setAuthorization: (user: IUser, accessToken: string) => void;
  resetAuthorization: () => void;
  setUser: (user: IUser) => void;
};

export const useAuthorization: TUseAuthorization = () => {
  const loader = useLoader();
  const dispatch = useDispatch();
  const { accessToken, user } = useStore((store) => store.authorization);

  const setAuthorization = (_user: IUser | undefined, _accessToken: string): void => {
    console.log(_user, _accessToken);
    dispatch({ type: SET_AUTHORIZATION, user: _user, accessToken: _accessToken });
  };

  const setUser = (user: IUser): void => {
    dispatch({ type: SET_USER, user: user });
  };

  const resetAuthorization = (): void => {
    const logout = loader.create("Processing logout...");
    logout.start();

    const ref = setTimeout(() => {
      dispatch({ type: RST_AUTHORIZATION });
      logout.stop();
      window.open("/#/sign-in", "_self");
      clearTimeout(ref);
    }, 1000);
  };

  return {
    isAuthorized: !!user.id,
    accessToken,
    user,
    setAuthorization,
    setUser,
    resetAuthorization,
  };
};
