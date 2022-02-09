import React from "react";
export function UserCircle(props) {
  const hue = props.name
    ? (props.name.split(" ")[1].toUpperCase().charCodeAt(0) - 65) * 10
    : 0;

  return (
    <div
      style={{ backgroundColor: `hsl(${hue}, 50%, 90%)` }}
      className="user-circle d-flex align-items-center justify-content-center"
    >
      <span
        style={{ color: `hsl(${hue}, 80%, 30%)` }}
        className="text-user-circle"
      >
        {props.name
          ? props.name.split(" ")[0][0].toUpperCase() +
            props.name.split(" ")[1][0].toUpperCase()
          : " "}
      </span>
    </div>
  );
}
