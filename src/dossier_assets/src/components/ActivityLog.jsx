import React from "react";

function ActivityLogHeading(props) {
  return (
    <div
      className="blocks activityLog container-fluid row"
      style={{ backgroundColor: props.backgroundColour }}
    >
      <h6 className="col">{props.activity}</h6>

      <h6 className="col">{props.amount}</h6>

      <h6 className="col">{props.time}</h6>

      <h6 className="col">{props.date}</h6>
    </div>
  );
}

export default ActivityLogHeading;
