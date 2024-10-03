import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICustomerOperations } from "../services/ICustomerOperations";
import { IUser } from "../models/IUser";



export interface ICreateEditPageProps {
 crudOperations: ICustomerOperations;
 initialUser?: IUser;
 onSave: (user: IUser) => void;
 onCancel: () => void;
}

const navigate = useNavigate();
const SaveCustomer: React.FC<ICreateEditPageProps> = ({
 crudOperations,
 initialUser,
 onSave,
 onCancel,
}) => {
 const [user, setUser] = useState<IUser>(initialUser || {
  sno: 0,
  name: "",
  age: 18,
  gender: "Unspecified",
  address: {
   street: "",
   city: "",
   localarea: "",
   zip: ""
  }
 });


 const [isSaving, setIsSaving] = useState(false);

 useEffect(() => {
  if (initialUser) {
   setUser(initialUser);
  }
 }, [initialUser]);

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsSaving(true);
  try {
   const savedUser = await crudOperations.createUser(user);
   if (savedUser) {
    onSave(savedUser);
    navigate("/customers");
   } else {
    console.error("Error creating user:", savedUser);
   }

  } catch (error) {
   console.error("Error creating user:", error);
  } finally {
   setIsSaving(false);
  }
 };


 return (
  <div>
   <h2>{initialUser ? "Edit User" : "Create New User"}</h2>
   <form onSubmit={handleSubmit}>
    <div>
     <label htmlFor="name">Name:</label>
     <input type="text" id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
    </div>
    <div>
     <label htmlFor="age">Age:</label>
     <input type="number" id="age" value={user.age} onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) })} required />
    </div>
    <div>
     <label htmlFor="gender">Gender:</label>
     <select id="gender" value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
     </select>
    </div>
    <div>
     <label htmlFor="street">Street:</label>
     <input type="text" id="street" value={user.address.street} onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })} required />
    </div>
    <div>
     <label htmlFor="city">City:</label>
     <input type="text" id="city" value={user.address.city} onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })} required />
    </div>
    <div>
     <label htmlFor="localarea">Local Area:</label>
     <input type="text" id="localarea" value={user.address.localarea} onChange={(e) => setUser({ ...user, address: { ...user.address, localarea: e.target.value } })} required />
    </div>
    <div>
     <label htmlFor="zip">ZIP Code:</label>
     <input type="text" id="zip" value={user.address.zip} onChange={(e) => setUser({ ...user, address: { ...user.address, zip: e.target.value } })} required />
    </div>
    <div>
     <button type="submit" disabled={isSaving}>
      {isSaving ? "Saving..." : "Save"}
     </button>
     <button onClick={onCancel}>Cancel</button>
 </div>
 </form>
 </div>
 );
};



export {SaveCustomer};