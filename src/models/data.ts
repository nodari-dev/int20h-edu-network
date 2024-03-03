import {IUser} from "./user";
import {IGroup} from "./group";

export interface IData {
    users: IUser[],
    groups: IGroup[],
}
