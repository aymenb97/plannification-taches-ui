import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

export default function Tag(props) {
  return (
    <span
      style={{ whiteSpace: "nowrap", lineHeight: "3em", color: "#5e6278" }}
      className="bg-light p-2 rounded m-2 "
    >
      <span
        onClick={props.clicked}
        style={{ cursor: "pointer" }}
        className="svg-icon text-hover "
      >
        <FontAwesomeIcon icon={faMinusCircle} />
      </span>
      <span className="  m-2 fw-bold fs-6 ">{props.name.toUpperCase()}</span>
    </span>
  );
}
