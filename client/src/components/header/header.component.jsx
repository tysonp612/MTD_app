import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
//Firebase
import { signOutUser } from "../../firebase/firebase.utils";
//Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UserActionTypes } from "../../redux/reducers/user/user.types";

const Header = () => {
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOutUser();
    dispatch({ type: UserActionTypes.LOGOUT, payload: null });
  };
  return (
    <nav className=" pb-2 pt-2 mb-3 border-bottom d-flex justify-content-between">
      <ul className="nav-pills nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {loggedInUser ? (
          <li className="nav-item dropdown">
            <NavDropdown title={loggedInUser.name} id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">
                Something else here
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="4.4" onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        ) : (
          ""
        )}
      </ul>
      {!loggedInUser ? (
        <ul className="nav-pills nav  ">
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Header;
