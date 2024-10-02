import { IUser } from "../models/IUser";

export class UserData {
  static readonly users: IUser[] = [
    {
      sno: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
      address: {
        street: "123 Main St",
        city: "New York",
        localarea: "Manhattan",
        zip: "10001"
      }
    },
    {
      sno: 2,
      name: "Jane Smith",
      age: 28,
      gender: "Female",
      address: {
        street: "456 Elm St",
        city: "Los Angeles",
        localarea: "Hollywood",
        zip: "90028"
      }
    },
    {
      sno: 3,
      name: "Bob Johnson",
      age: 45,
      gender: "Male",
      address: {
        street: "789 Oak Ave",
        city: "Chicago",
        localarea: "Loop",
        zip: "60601"
      }
    }
  ];

  static readonly adminUser: IUser = {
    sno: 999,
    name: "Admin User",
    age: 35,
    gender: "Other",
    address: {
      street: "1 Admin Plaza",
      city: "Washington",
      localarea: "D.C.",
      zip: "20001"
    }
  };

  static readonly defaultAddress = {
    street: "Unknown",
    city: "Unknown",
    localarea: "Unknown",
    zip: "00000"
  };

  static getDefaultUser(name: string): IUser {
    return {
      sno: 0,
      name: name,
      age: 18,
      gender: "Unspecified",
      address: this.defaultAddress
    };
  }
}
