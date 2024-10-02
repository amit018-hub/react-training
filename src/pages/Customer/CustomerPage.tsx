import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "../../components/customers/CustomerList";
import { CustomerOperationService } from "../../components/services/CustomerOperationService";
import { IUser } from "../../components/models/IUser";
function CustomerPage() {
  const navigate = useNavigate();
  const crudOperations = new CustomerOperationService();

  const handleCreate = () => {
     navigate("/customers/SaveCustomer");
  };

  const handleEdit = (user: IUser) => {
    navigate(`/customers/SaveCustomer/${user.sno}`);
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
    </section>
  );
}

export default CustomerPage;
