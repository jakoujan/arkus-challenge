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
}

export interface IProfile {
    role: string;
    description: string;
}