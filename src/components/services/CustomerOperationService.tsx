import { ICustomerOperations } from "./ICustomerOperations";
import { UserData } from "../staticdata/UserList";
import { IUser } from "../models/IUser";
//import axios from 'axios';

//const API_BASE_URL = 'https://your-api-base-url.com/api';

export class CustomerOperationService implements ICustomerOperations {
  async getAllUsers(): Promise<IUser[]> {
    return Promise.resolve(UserData.users);
  }

  async getUserById(id: number): Promise<IUser | undefined> {
    return Promise.resolve(UserData.users.find((user) => user.sno === id));
  }

  async createUser(user: IUser): Promise<IUser> {
    const maxSno = Math.max(0, ...UserData.users.map(u => u.sno));
    const newUser = { ...user, sno: maxSno + 1 };
    UserData.users.push(newUser);
    return Promise.resolve(newUser);
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


  //async getAllUsers(): Promise<IUser[]> {
  //  const response = await axios.get<IUser[]>(`${API_BASE_URL}/users`);
  //  return response.data;
  //}

  //async getUserById(id: number): Promise<IUser | undefined> {
  //  const response = await axios.get<IUser>(`${API_BASE_URL}/users/${id}`);
  //  return response.data;
  //}

  //async createUser(user: IUser): Promise<IUser> {
  //  const response = await axios.post<IUser>(`${API_BASE_URL}/users`, user);
  //  return response.data;
  //}

  //async updateUser(user: IUser): Promise<IUser> {
  //  const response = await axios.put<IUser>(`${API_BASE_URL}/users/${user.sno}`, user);
  //  return response.data;
  //}

  //async deleteUser(id: number): Promise<void> {
  //  await axios.delete(`${API_BASE_URL}/users/${id}`);
  //}
}