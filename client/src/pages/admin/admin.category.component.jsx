import React from "react";
import AdminNav from "./../../components/navigation/admin-navigation.component";
export const AdminCategory = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">ADMIN CATEGORY</div>
      </div>
    </div>
  );
};
