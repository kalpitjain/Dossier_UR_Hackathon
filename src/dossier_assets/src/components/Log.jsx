import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import {
  dossier,
  canisterId,
  createActor,
} from "../../../declarations/dossier";
import { AuthClient } from "@dfinity/auth-client";

function Log(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [logDeletionFee, setLogDeletionFee] = useState("");

  async function getLogDeletionFee() {
    const fee = await dossier.getDeleteLogFee();
    setLogDeletionFee(parseInt(fee.toLocaleString()));
  }
  getLogDeletionFee();

  async function handleDeleteClick() {
    setDisabled(true);
    // Live Network
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const result = await authenticatedCanister.deductDeleteLogFee();

    // // Local Network
    // const result = await dossier.deductDeleteLogFee();
    console.log(result);

    if (result === "! Success !") {
      const time = new Date().toLocaleTimeString();
      const date = new Date().toISOString().split("T")[0];
      dossier.createActivityLog(
        props.userPrincipal,
        "Deleted Log",
        (-logDeletionFee).toString(),
        time.toString(),
        date.toString()
      );
      props.onDelete(props.id);
    }
    setDisabled(false);
  }

  function handleReadMoreClick() {
    setExpanded(true);
  }
  function handleReadLessClick() {
    setExpanded(false);
  }

  return (
    <div className="log" style={{ backgroundColor: props.backgroundColour }}>
      <h1>{props.title}</h1>
      {props.content.length > 300 ? (
        isExpanded ? (
          <p>
            {props.content}{" "}
            <span className="readLessLink" onClick={handleReadLessClick}>
              Read Less
            </span>
          </p>
        ) : (
          <p>
            {props.content.substring(0, 300)}
            <span className="readMoreLink" onClick={handleReadMoreClick}>
              ...Read More
            </span>
          </p>
        )
      ) : (
        <p>{props.content}</p>
      )}
      <div className="date-time">
        <p className="time" id="time">
          {props.time}
        </p>
        <p className="date" id="date">
          {props.date}
        </p>
      </div>
      {props.userId === props.userPrincipal ? (
        <button
          disabled={disabled}
          onClick={handleDeleteClick}
          style={{ backgroundColor: props.backgroundColour }}
        >
          <DeleteIcon />
        </button>
      ) : (
        <button
          disabled={true}
          style={{ backgroundColor: props.backgroundColour }}
        >
          <ReportIcon />
        </button>
      )}
    </div>
  );
}

export default Log;
