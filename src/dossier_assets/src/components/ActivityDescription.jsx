import React from "react";

function ActivityDescription(props) {
  return (
    <div className="blocks activityDescription container-fluid row">
      <h4 className="col">{props.activity}</h4>

      <h4 className="col">{props.amount}</h4>

      <h4 className="col">{props.time}</h4>

      <h4 className="col">{props.date}</h4>
    </div>
  );
}

export default ActivityDescription;
