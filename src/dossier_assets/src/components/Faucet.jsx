import React, { useState } from "react";
import {
  dossier,
  canisterId,
  createActor,
} from "../../../declarations/dossier";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const initialMessage = "Claim Tokens to " + props.userPrincipal;
  const [isDisabled, setDisabled] = useState(false);
  const [messageText, setMessageText] = useState(initialMessage);
  const [amount, setAmount] = useState("");

  async function getfaucetAmount() {
    const faucetAmount = await dossier.faucetAmount();
    setAmount(faucetAmount);
  }
  getfaucetAmount();

  async function handleClick(event) {
    setDisabled(true);

    // Live Network
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const result = await authenticatedCanister.payOut();

    // // Local Network
    // const result = await dossier.payOut();

    if (result === "! Success !") {
      const time = new Date().toLocaleTimeString();
      const date = new Date().toISOString().split("T")[0];
      dossier.createActivityLog(
        props.userPrincipal,
        "Faucet",
        amount.toString(),
        time.toString(),
        date.toString()
      );
    } else {
      const time = new Date().toLocaleTimeString();
      const date = new Date().toISOString().split("T")[0];
      dossier.createActivityLog(
        props.userPrincipal,
        "Faucet",
        "0",
        time.toString(),
        date.toString()
      );
    }

    setMessageText(result);
  }

  return (
    <div className="faucet blocks">
      <h1 className="dossierFinanceBlockHeading">Faucet</h1>

      <h6>Get your free Dossier tokens here !</h6>
      <h6
        onClick={() => {
          console.log(navigator.clipboard.writeText(props.userPrincipal));
        }}
      >
        {messageText}
      </h6>

      <button
        disabled={isDisabled}
        className="btn btn-dark"
        id="btn-payout"
        onClick={handleClick}
      >
        Get {props.tokenSymbol}
      </button>
    </div>
  );
}

export default Faucet;
