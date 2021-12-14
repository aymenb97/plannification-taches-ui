import React from "react";
export function UserCircle(props) {
  const hue = (props.name.split(" ")[1].toUpperCase().charCodeAt(0) - 65) * 10;

  return (
    <div
      style={{ backgroundColor: `hsl(${hue}, 50%, 86%)` }}
      className="user-circle d-flex align-items-center justify-content-center"
    >
      <span
        style={{ color: `hsl(${hue}, 80%, 20%)` }}
        className="text-user-circle"
      >
        {props.name
          .split(" ")
          .map((item) => item[0].toUpperCase())
          .join("")}
      </span>
    </div>
  );
}
