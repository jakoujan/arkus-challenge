import { IAccount, IUser } from "./entities";

export interface ICredentialRequest {
    username: string;
    password: string;
}

export interface IUsersToAssign {
    users: Array<IUser>;
    account: IAccount;
}