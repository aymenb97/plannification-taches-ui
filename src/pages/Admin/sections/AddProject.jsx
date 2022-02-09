import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux/navActions";
function AddProject() {
  const dispatch = useDispatch();
  const [count, setCount] = useState([]);

  dispatch(setPageTitle("Ajouter Projet"));
  return <></>;
}
export default AddProject;
