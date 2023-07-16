import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AccountDetails from "../components/AccountDetails";
import ActivityDescription from "../components/ActivityDescription";
import ActivityLog from "../components/ActivityLog";
import { dossier } from "../../../declarations/dossier";
import { Principal } from "@dfinity/principal";

function Dossier(props) {
  const [activityLogs, setActivityLogs] = useState([]);
  const [balanceResult, setBalanceResult] = useState("0");
  const [tokenSymbol, setTokenSymbol] = useState("");

  async function getData() {
    const balance = await dossier.balanceOf(
      Principal.fromText(props.loggedInPrincipal)
    );
    setTokenSymbol(await dossier.getSymbol());
    setBalanceResult(balance.toLocaleString());
  }
  getData();

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const activityLogArray = await dossier.readActivityLogs();
    setActivityLogs(activityLogArray);
  }

  return (
    <div>
      <Header
        heading={"Dossier Account"}
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
        headingRedirectLink={"/"}
        accountRedirectLink={"/DossierAccount"}
      />

      <AccountDetails
        userPrincipal={props.loggedInPrincipal}
        userFunds={balanceResult}
        tokenSymbol={tokenSymbol}
      />

      <div className="blocks activityLogHeading">
        <h3>Activity Logs</h3>
      </div>

      <ActivityDescription
        activity={"Activity"}
        amount={tokenSymbol}
        date={"Date"}
        time={"Time"}
      />

      <div className="scrollable">
        {activityLogs.map((activityLogItem, index) => {
          if (
            activityLogItem.user === props.loggedInPrincipal &&
            activityLogItem.activity === "Faucet"
          ) {
            return (
              <ActivityLog
                key={index}
                id={index}
                activity={activityLogItem.activity}
                amount={activityLogItem.amount}
                date={activityLogItem.date}
                time={activityLogItem.time}
                userPrincipal={props.loggedInPrincipal}
                backgroundColour={"#72ee72"}
              />
            );
          } else if (
            activityLogItem.user === props.loggedInPrincipal &&
            activityLogItem.activity === "Checked Balance"
          ) {
            return (
              <ActivityLog
                key={index}
                id={index}
                activity={activityLogItem.activity}
                amount={activityLogItem.amount}
                date={activityLogItem.date}
                time={activityLogItem.time}
                userPrincipal={props.loggedInPrincipal}
                backgroundColour={"#ffe065"}
              />
            );
          } else if (
            activityLogItem.user === props.loggedInPrincipal &&
            activityLogItem.activity === "Transferred Funds"
          ) {
            return (
              <ActivityLog
                key={index}
                id={index}
                activity={activityLogItem.activity}
                amount={activityLogItem.amount}
                date={activityLogItem.date}
                time={activityLogItem.time}
                userPrincipal={props.loggedInPrincipal}
                backgroundColour={"#ff7c65"}
              />
            );
          } else if (
            activityLogItem.user === props.loggedInPrincipal &&
            activityLogItem.activity === "Created Log"
          ) {
            return (
              <ActivityLog
                key={index}
                id={index}
                activity={activityLogItem.activity}
                amount={activityLogItem.amount}
                date={activityLogItem.date}
                time={activityLogItem.time}
                userPrincipal={props.loggedInPrincipal}
                backgroundColour={"#94d1ff"}
              />
            );
          } else if (
            activityLogItem.user === props.loggedInPrincipal &&
            activityLogItem.activity === "Deleted Log"
          ) {
            return (
              <ActivityLog
                key={index}
                id={index}
                activity={activityLogItem.activity}
                amount={activityLogItem.amount}
                date={activityLogItem.date}
                time={activityLogItem.time}
                userPrincipal={props.loggedInPrincipal}
                backgroundColour={"#ffb1c4"}
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
