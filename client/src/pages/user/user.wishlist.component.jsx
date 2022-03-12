import React from "react";
import UserNav from "../../components/navigation/user-navigation.component";
const Wishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">User wishlist Update Page</div>
      </div>
    </div>
  );
};

export default Wishlist;
