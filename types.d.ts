interface IUser {
    name: string;
    email: string;
    role: string;
    photo: string;
    _id: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface GenericResponse {
    status: string;
    message: string;
}

interface ILoginResponse {
    status: string;
    access_token: string;
}

interface IUserResponse {
    status: string;
    data: {
        user: IUser;
    };
}