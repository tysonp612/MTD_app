import React, { useEffect, useState } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";

export const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h1>ADMIN DASHBOARD</h1>
        </div>
      </div>
    </div>
  );
};
