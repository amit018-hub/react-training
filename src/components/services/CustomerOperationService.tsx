import { ICustomerOperations } from "./ICustomerOperations";
import { UserData } from "../staticdata/UserList";
import { IUser } from "../models/IUser";

export class CustomerOperationService implements ICustomerOperations {
  async getAllUsers(): Promise<IUser[]> {
    return Promise.resolve(UserData.users);
  }

  async getUserById(id: number): Promise<IUser | undefined> {
    return Promise.resolve(UserData.users.find((user) => user.sno === id));
  }

  async createUser(user: IUser): Promise<IUser> {
    UserData.users.push(user);
    return Promise.resolve(user);
  }

  async updateUser(user: IUser): Promise<IUser> {
    const index = UserData.users.findIndex((existingUser) => existingUser.sno === user.sno);
    if (index !== -1) {
      UserData.users[index] = user;
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error("User not found"));
    }
  }

  async deleteUser(id: number): Promise<void> {
    const index = UserData.users.findIndex((user) => user.sno === id);
    if (index !== -1) {
      UserData.users.splice(index, 1);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("User not found"));
    }
  }
}