import { EAssingmentStatus } from "../enums/enums";

export interface IResponse {
    code: number;
    message: string;
    data: any;
}

export interface Item {
    id: string | number;
    description: string;
}

export interface ISession {
    user: IUser;
    token: string;
}

export interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    userRole: string;
    englishLevel: string;
    techKnowledge: string;
    resumeLink: string;
}

export interface IProfile {
    role: string;
    description: string;
}

export interface IAccount {
    id: number;
    accountName: string;
    customerName: string;
    responsible: string;
}

export interface IAssignment {
    id: number;
    user: number;
    account: number;
    startDate: Date;
    endDate: Date;
    status: number;
}

export interface IAssignmentView extends IAssignment {
    name: string;
    accountName: string;
}

export interface IAssignmentData {
    user: IUser;
    status: EAssingmentStatus;
}