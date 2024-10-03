import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "../../components/customers/CustomerList";
import { CustomerOperationService } from "../../components/services/CustomerOperationService";
import { IUser } from "../../components/models/IUser";
import { SaveCustomer } from "../../components/customers/SaveCustomer";
function CustomerPage() {
 
  const crudOperations = new CustomerOperationService();
  const navigate = useNavigate();
  const handleCreate = () => {
     navigate("/customers/SaveCustomer");
  };

  const handleEdit = (user: IUser) => {
    navigate(`/customers/SaveCustomer/${user.sno}`);
  };
  const handleCancel = () => {
    navigate(`/customers`);
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
      <CustomerList
        crudOperations={crudOperations}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <SaveCustomer  
        crudOperations={crudOperations}
        onSave={handleCreate} 
        onCancel={handleCancel}
        />
    </section>
  );
}

export default CustomerPage;
