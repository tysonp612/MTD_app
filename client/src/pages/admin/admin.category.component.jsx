import React, { useState, useEffect } from "react";
import AdminNav from "./../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "./../../utils/category/category.utils";
export const AdminCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    loadCategory();
  }, []);
  const loadCategory = async () => {
    await getCategories()
      .then((res) => setCategory(res))
      .catch((err) => console.log(err));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory(user.token, name);
      if (res) toast.success("Category created successfully");
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };
  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button className="btn btn-outline-primary mt-3">Save</button>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3>Create Category</h3>
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};
