import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import {
  dossier,
  canisterId,
  createActor,
} from "../../../declarations/dossier";
import { AuthClient } from "@dfinity/auth-client";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [logCreationFee, setLogCreationFee] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isHidden, setHidden] = useState(true);
  const [message, setmessage] = useState();
  const [mode, setMode] = useState("All Logs");

  async function getLogCreationFee() {
    const fee = await dossier.getCreateLogFee();
    setLogCreationFee(parseInt(fee.toLocaleString()));
  }
  getLogCreationFee(props);

  const time = new Date().toLocaleTimeString();
  const date = new Date().toISOString().split("T")[0];
  const [log, setLog] = useState({
    title: "",
    content: "",
    userId: props.userPrincipal,
    time: time,
    date: date,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toISOString().split("T")[0];

    setLog((prevLog) => {
      return {
        ...prevLog,
        userId: props.userPrincipal,
        time: currentTime,
        date: currentDate,
        [name]: value,
      };
    });
  }

  async function submitLog(event) {
    setDisabled(true);
    // Live Network
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const result = await authenticatedCanister.deductCreateLogFee();

    // // Local Network
    // const result = await dossier.deductCreateLogFee();

    if (result === "! Success !") {
      dossier.createActivityLog(
        props.userPrincipal,
        "Created Log",
        (-logCreationFee).toString(),
        time.toString(),
        date.toString()
      );
      props.onAdd(log);
    }

    setLog({
      title: "",
      content: "",
      userId: props.userPrincipal,
      time: time,
      date: date,
    });

    setHidden(false);
    setmessage(result);
    setDisabled(false);
    setExpanded(false);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  function changeMode() {
    setMode((prev) => {
      if (prev === "All Logs") {
        props.getMode("My Logs");
        return "My Logs";
      } else {
        props.getMode("All Logs");
        return "All Logs";
      }
    });
  }

  return (
    <div>
      <form className="create-log">
        <span className="switch" onClick={changeMode}>
          {mode}
        </span>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={log.title}
            placeholder="Title"
            spellCheck="false"
            required
          />
        )}

        <textarea
          name="content"
          value={log.content}
          placeholder="Make a Log..."
          rows={isExpanded ? 3 : 1}
          onClick={expand}
          onChange={handleChange}
          spellCheck="false"
          required
        />

        <Zoom in={isExpanded}>
          <Fab disabled={disabled} onClick={submitLog}>
            <CreateIcon />
          </Fab>
        </Zoom>

        <p className="message" hidden={!isHidden}>
          {logCreationFee} {props.tokenSymbol}
        </p>

        <p className="message" hidden={isHidden}>
          {message}
        </p>
      </form>
    </div>
  );
}

export default CreateArea;
