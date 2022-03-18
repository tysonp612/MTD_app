import React from "react";

export const ProductForm = ({
  values,
  handleChange,
  handleSubmit,
  handleCatChange,
}) => {
  const {
    title,
    description,
    price,
    category,
    categories,
    subcategory,
    shipping,
    quantity,
    images,
    colors,
    brand,
    color,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-froup">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-froup">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-froup">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-froup">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>shipping?</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-froup">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-froup">
        <label>Colors</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>please select color</option>
          {colors.map((cl) => (
            <option value={cl} key={cl}>
              {cl}
            </option>
          ))}
        </select>
      </div>
      <div className="form-froup">
        <label>Brand</label>
        <input
          type="text"
          name="brand"
          className="form-control"
          value={brand}
          onChange={handleChange}
        />
      </div>
      <div className="form-froup">
        <label>Categories</label>
        <select
          name="categories"
          className="form-control"
          onChange={handleCatChange}
        >
          <option></option>
          {categories.map((c) => {
            return (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            );
          })}
          {/* {categories.length > 0 &&
            categories.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })} */}
        </select>
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
};
