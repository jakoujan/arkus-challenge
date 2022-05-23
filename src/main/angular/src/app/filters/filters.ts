import { IAccount, IAssignmentView, IUser } from "../interfaces/entities";

export interface IFilter<T> {
    entity: T;
    startDate: Date;
    endDate: Date;
    page: number;
    rows: number;
    hidden: boolean;
    pageable?: boolean;
}

export interface IUserFilter extends IFilter<IUser> {
}

export interface IAccountFilter extends IFilter<IAccount> {
}

export interface IAssignmentViewFilter extends IFilter<IAssignmentView> {
}

