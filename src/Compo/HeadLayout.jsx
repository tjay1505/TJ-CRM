import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function HeadLayout() {
  const location = useLocation();

  return (
    <>
      <div className="col-12 py-3 px-1 d-flex align-items-center justify-content-evenly">
        <h1 className="col-2">Logo</h1>
        <ul className="col-7 my-2 list-unstyled d-flex align-items-center justify-content-between bg-dark-subtle rounded-5 py-2 px-4">
          <li className={location.pathname === "/" ? "active rounded-5 text-white" : ""}>
            <Link className="text-decoration-none" to="/">
              Dash-board
            </Link>
          </li>
          <li className={location.pathname === "/list" ? "active rounded-5 text-white" : "text-dark"}>
            <Link className="text-decoration-none" to="/list">
              Leads
            </Link>
          </li>
          <li className={location.pathname === "/new-leads" ? "active rounded-5 text-white" : "text-dark"}>
            <Link className="text-decoration-none" to="/new-leads">
              Add new
            </Link>
          </li>
          
          <li className={location.pathname === "/task" ? "active rounded-5 text-white" : "text-dark"}>
            <Link className="text-decoration-none" to="/task">
              Task
            </Link>
          </li>
        </ul>
        <ul className="col-3 d-flex align-items-center my-1 justify-content-evenly">
          <div className="bg-dark text-white rounded-circle border p-1 ">
            user
          </div>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
