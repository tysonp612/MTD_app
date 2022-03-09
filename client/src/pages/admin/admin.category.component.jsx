import React, { useState, useEffect } from "react";
import AdminNav from "./../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "./../../utils/category/category.utils";
export const AdminCategory = () => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = async () => {
    await getCategories()
      .then((res) => {
        setCategories(res.data);
      })
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
  const handleDelete = (slug) => {
    console.log(slug);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(input);
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
          <br />
          {categories.map(({ _id, name, slug }) => (
            <div className="alert alert-secondary row" key={_id}>
              <div className="col-md-10">{name}</div>
              <span
                className="pr-5 col-md-1 text-center btn btn-outline-secondary"
                onClick={() => handleDelete(slug)}
              >
                Delete
              </span>
              <span className=" col-md-1 text-center btn btn-outline-secondary">
                Edit
              </span>
              <div>
                <input type="text" onChange={(e) => setInput(e.target.value)} />
                <div
                  className="btn btn-outline-secondary"
                  onClick={handleUpdate}
                >
                  Update
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
