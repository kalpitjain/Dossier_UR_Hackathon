import React from "react";

function AccountDetails(props) {
  return (
    <div className="blocks account-details">
      <h1 className="dossierFinanceBlockHeading">Accound Details</h1>

      <h5
        onClick={() => {
          console.log(navigator.clipboard.writeText(props.userPrincipal));
        }}
      >
        Account Id: {props.userPrincipal}
      </h5>

      <h5>
        Funds: {props.userFunds} {props.tokenSymbol}
      </h5>
    </div>
  );
}

export default AccountDetails;
