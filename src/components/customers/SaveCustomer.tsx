import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICustomerOperations } from "../services/ICustomerOperations";
import { IUser } from "../models/IUser";
import "bootstrap/dist/css/bootstrap.min.css";

export interface ICreateEditPageProps {
  crudOperations: ICustomerOperations;
  initialUser: IUser | null;
  onSave: (user: IUser) => void;
  onCancel: () => void;
}

const SaveCustomer: React.FC<ICreateEditPageProps> = ({
  crudOperations,
  initialUser,
  onSave,
  onCancel,
}) => {
  const [user, setUser] = useState<IUser>(
    initialUser || {
      sno: 0,
      name: "",
      age: 0,
      gender: "Unspecified",
      address: {
        street: "",
        city: "",
        localarea: "",
        zip: "",
      },
    }
  );
  debugger;
  const navigate = useNavigate();
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
      let savedUser: IUser | null;
      if (initialUser) {
        savedUser = await crudOperations.updateUser( user);
      } else {
        savedUser = await crudOperations.createUser(user);
      }
      if (savedUser) {
        onSave(savedUser);
        navigate("/customers");
      } else {
        console.error("Error saving user:", savedUser);
      }
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2>{initialUser ? "Edit User" : "Create New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <label htmlFor="name">Name:</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  required
                />
              </div>
          
              <div className="col-4">
                <label htmlFor="age">Age:</label>
                <input
                  className="form-control"
                  type="number"
                  id="age"
                  value={user.age}
                  onChange={(e) =>
                    setUser({ ...user, age: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
         
              <div className="col-4">
                <label htmlFor="gender">Gender:</label>
                <select
                  className="form-control"
                  id="gender"
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
          
              <div className="col-4">
                <label htmlFor="street">Street:</label>
                <input
                  className="form-control"
                  type="text"
                  id="street"
                  value={user.address.street}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: { ...user.address, street: e.target.value },
                    })
                  }
                  required
                />
              </div>
          
              <div className="col-4">
                <label htmlFor="city">City:</label>
                <input
                  className="form-control"
                  type="text"
                  id="city"
                  value={user.address.city}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: { ...user.address, city: e.target.value },
                    })
                  }
                  required
                />
              </div>
          
              <div className="col-4">
                <label htmlFor="localarea">Local Area:</label>
                <input
                  className="form-control"
                  type="text"
                  id="localarea"
                  value={user.address.localarea}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: { ...user.address, localarea: e.target.value },
                    })
                  }
                  required
                />
              </div>
          
              <div className="col-4">
                <label htmlFor="zip">ZIP Code:</label>
                <input
                  className="form-control"
                  type="text"
                  id="zip"
                  value={user.address.zip}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: { ...user.address, zip: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="p-3 float-left">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button className="btn btn-danger" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { SaveCustomer };
