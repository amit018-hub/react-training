import React, { useState, useEffect } from "react";
import { ICustomerOperations } from "../services/ICustomerOperations";
import { IUser } from "../models/IUser";

interface IListPageProps {
  crudOperations: ICustomerOperations;
  onCreate: () => void;
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
}

const CustomerList: React.FC<IListPageProps> = ({ crudOperations, onCreate, onEdit }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const fetchedUsers = await crudOperations.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [crudOperations]);

  const handleCreate = () => {
    onCreate();
   
  };

  const handleEdit = (user: IUser) => {
    onEdit(user);
  };

  const handleDelete = async (id: number) => {
    try {
      await crudOperations.deleteUser(id);
      const filteredUsers = users.filter((user) => user.sno !== id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <div>
      <h2>Customer List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>SNo</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.sno}>
                <td>{user.sno}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{`${user.address.street}, ${user.address.city}, ${user.address.localarea}, ${user.address.zip}`}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.sno)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleCreate}>Create New User</button>
    </div>
  );
};
export default CustomerList;