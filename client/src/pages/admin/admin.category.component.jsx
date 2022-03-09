import React, { useState, useEffect } from "react";
import AdminNav from "./../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryUpdate from "./admin.category-update.component";
import {
  createCategory,
  getCategories,
  removeCategory,
  updateCategory,
} from "./../../utils/category/category.utils";
export const AdminCategory = () => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const [ok, setOk] = useState(false);
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
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory(user.token, name);
      if (res) toast.success("Category created successfully");
      setName("");
      loadCategories();
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleDelete = async (slug) => {
    const confirm = window.confirm("Are you sure to delete this category?");
    if (confirm) {
      await removeCategory(slug, user.token)
        .then((res) => {
          toast.success("Category deleted successfully");
          loadCategories();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data);
        });
    }
  };
  const handleEdit = (slug) => {
    setSlug(slug);
    setOk(true);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCategory(slug.toLocaleLowerCase(), user.token, input)
      .then((res) => {
        toast.success("Category updated successfully");
        loadCategories();
        setOk(false);
        setSlug("");
        setInput("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };
  const categoryForm = () => {
    return (
      <form onSubmit={handleCreate}>
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
  const updateCategoryForm = () => {
    return (
      <form onSubmit={handleUpdate}>
        <label>Update Category</label>
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-primary mt-3"
          disabled={input.length < 2 || input.length > 36 ? true : false}
        >
          Update
        </button>
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
          {ok ? updateCategoryForm() : ""}
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
              <span
                className=" col-md-1 text-center btn btn-outline-secondary"
                onClick={() => handleEdit(slug)}
              >
                Edit
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
