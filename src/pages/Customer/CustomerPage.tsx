import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "../../components/customers/CustomerList";
import { CustomerOperationService } from "../../components/services/CustomerOperationService";
import { IUser } from "../../components/models/IUser";

function CustomerPage() {
  debugger;
  const crudOperations = new CustomerOperationService();
  const navigate = useNavigate();
  const handleCreate = () => {
     navigate("/customers/save");
  };

  const handleEdit = (user: IUser) => {
    navigate(`/customers/edit/${user.sno}`);
  };
 
  const handleDelete = async (id: number) => {
    try {
      await crudOperations.deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section>
        <h2>Customer List</h2>
        <div className="p-2 float-end">
        <button className="btn btn-primary" onClick={handleCreate}>Create New User</button>
      </div>
      <CustomerList
        crudOperations={crudOperations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    
    </section>
  );
}

export default CustomerPage;
