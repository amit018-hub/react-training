import { IUser } from "../models/IUser";

export interface ICustomerOperations {
    getAllUsers: () => Promise<IUser[]>;
    getUserById: (id: number) => Promise<IUser | undefined>;
    createUser: (user: IUser) => Promise<IUser>;
    updateUser: (user: IUser) => Promise<IUser>;
    deleteUser: (id: number) => Promise<void>;
  }