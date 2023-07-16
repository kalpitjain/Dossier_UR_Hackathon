import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { dossier } from "../../../declarations/dossier";

function Balance(props) {
  const [inputValue, setInputValue] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await dossier.balanceOf(principal);

    setBalanceResult(balance.toLocaleString());

    const time = new Date().toLocaleTimeString();
    const date = new Date().toISOString().split("T")[0];
    dossier.createActivityLog(
      props.userPrincipal,
      "Checked Balance",
      "0",
      time.toString(),
      date.toString()
    );

    setHidden(false);
    setInputValue("");
  }

  return (
    <div className="balance blocks">
      <h1 className="dossierFinanceBlockHeading">Check Token Balance</h1>

      <input
        id="balance-principal-id"
        type="text"
        placeholder="  Enter Principal ID"
        required
        spellCheck="false"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />

      <button
        className="btn btn-dark"
        id="btn-request-balance"
        onClick={handleClick}
      >
        Check Balance
      </button>

      <h6 hidden={isHidden}>
        This account has a balance of {balanceResult} {props.tokenSymbol}.
      </h6>
    </div>
  );
}

export default Balance;
