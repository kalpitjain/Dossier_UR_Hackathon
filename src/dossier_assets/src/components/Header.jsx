import React from "react";
import { Link } from "react-router-dom";

function DossierHeader(props) {
  return (
    <nav className="navbar header">
      <div className="container-fluid">
        <Link
          to={props.headingRedirectLink}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h1>{props.heading}</h1>
        </Link>
        <Link
          to={props.accountRedirectLink}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h6>
            Funds: {props.userFunds} {props.tokenSymbol}
          </h6>
        </Link>
      </div>
    </nav>
  );
}
export default DossierHeader;
