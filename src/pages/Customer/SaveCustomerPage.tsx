import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerOperationService } from "../../components/services/CustomerOperationService";
import { SaveCustomer } from "../../components/customers/SaveCustomer";
import { IUser } from "../../components/models/IUser";

function SaveCustomerPage() {
  debugger;
  const [user, setUser] = useState<IUser | null>(null);
  const crudOperations = new CustomerOperationService();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await crudOperations.getUserById(parseInt(id));
          if (fetchedUser) {
            setUser(fetchedUser);
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSave = async (userData: IUser) => {
    try {
      if (id) {
        await crudOperations.updateUser(userData);
      } else {
        await crudOperations.createUser(userData);
      }
      navigate("/customers");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleCancel = () => {
    navigate("/customers");
  };

  return (
    <SaveCustomer
     initialUser={user}
      crudOperations={crudOperations}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}

export default SaveCustomerPage;