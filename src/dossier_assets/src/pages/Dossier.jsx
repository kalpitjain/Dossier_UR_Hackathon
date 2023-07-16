import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Log from "../components/Log";
import CreateArea from "../components/CreateArea";
import { dossier } from "../../../declarations/dossier";
import { Principal } from "@dfinity/principal";

function Dossier(props) {
  const [logs, setLogs] = useState([]);
  const [balanceResult, setBalanceResult] = useState("0");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [Mode, setMode] = useState("All Logs");

  async function getData() {
    const balance = await dossier.balanceOf(
      Principal.fromText(props.loggedInPrincipal)
    );
    setTokenSymbol(await dossier.getSymbol());
    setBalanceResult(balance.toLocaleString());
  }
  getData();

  function addLog(newLog) {
    setLogs((prevLogs) => {
      dossier.createLog(
        newLog.userId,
        newLog.title,
        newLog.content,
        newLog.time,
        newLog.date
      );
      return [newLog, ...prevLogs];
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const logArray = await dossier.readLogs();
    setLogs(logArray);
  }

  function deleteLog(id) {
    dossier.removeLog(id);
    setLogs((prevLogs) => {
      return prevLogs.filter((logItem, index) => {
        return index !== id;
      });
    });
  }

  function mode(mode) {
    setMode(mode);
  }

  return (
    <div>
      <Header
        heading={"Dossier"}
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
        headingRedirectLink={"/DossierFinance"}
        accountRedirectLink={"/DossierAccount"}
      />
      <CreateArea
        onAdd={addLog}
        getMode={mode}
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
      />
      <div>
        {logs.map((logItem, index) => {
          if (
            (Mode === "My Logs" &&
              logItem.userId === props.loggedInPrincipal &&
              index % 4 === 0) ||
            (Mode === "All Logs" && index % 4 === 0)
          ) {
            return (
              <Log
                key={index}
                id={index}
                title={logItem.title}
                content={logItem.content}
                time={logItem.time}
                date={logItem.date}
                userId={logItem.userId}
                userPrincipal={props.loggedInPrincipal}
                userFunds={balanceResult}
                onDelete={deleteLog}
                backgroundColour={"#ff7c65"}
              />
            );
          } else if (
            (Mode === "My Logs" &&
              logItem.userId === props.loggedInPrincipal &&
              index % 4 === 1) ||
            (Mode === "All Logs" && index % 4 === 1)
          ) {
            return (
              <Log
                key={index}
                id={index}
                title={logItem.title}
                content={logItem.content}
                time={logItem.time}
                date={logItem.date}
                userId={logItem.userId}
                userPrincipal={props.loggedInPrincipal}
                userFunds={balanceResult}
                onDelete={deleteLog}
                backgroundColour={"#ffe065"}
              />
            );
          } else if (
            (Mode === "My Logs" &&
              logItem.userId === props.loggedInPrincipal &&
              index % 4 === 2) ||
            (Mode === "All Logs" && index % 4 === 2)
          ) {
            return (
              <Log
                key={index}
                id={index}
                title={logItem.title}
                content={logItem.content}
                time={logItem.time}
                date={logItem.date}
                userId={logItem.userId}
                userPrincipal={props.loggedInPrincipal}
                userFunds={balanceResult}
                onDelete={deleteLog}
                backgroundColour={"#72ee72"}
              />
            );
          } else if (
            (Mode === "My Logs" &&
              logItem.userId === props.loggedInPrincipal &&
              index % 4 === 3) ||
            (Mode === "All Logs" && index % 4 === 3)
          ) {
            return (
              <Log
                key={index}
                id={index}
                title={logItem.title}
                content={logItem.content}
                time={logItem.time}
                date={logItem.date}
                userId={logItem.userId}
                userPrincipal={props.loggedInPrincipal}
                userFunds={balanceResult}
                onDelete={deleteLog}
                backgroundColour={"#94d1ff"}
              />
            );
          } else {
            return <div />;
          }
        })}
      </div>
    </div>
  );
}

export default Dossier;
