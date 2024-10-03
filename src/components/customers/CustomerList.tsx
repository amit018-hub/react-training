import React, { useState, useEffect } from "react";
import { ICustomerOperations } from "../services/ICustomerOperations";
import { IUser } from "../models/IUser";
import 'bootstrap/dist/css/bootstrap.min.css';

interface IListPageProps {
  crudOperations: ICustomerOperations;
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
}

const CustomerList: React.FC<IListPageProps> = ({ crudOperations, onEdit }) => {
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

  // const handleCreate = () => {
  //   onCreate();
   
  // };

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
     
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered data-table">
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
                  <button className="btn btn-success me-2" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.sno)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
     
    </div>
  );
};
export default CustomerList;