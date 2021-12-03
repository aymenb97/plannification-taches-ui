import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux";
function AddProject() {
  const dispatch = useDispatch();
  const [count, setCount] = useState([]);
  setCount(["Orange", "Apple", "Fruit"]);
  dispatch(setPageTitle("Ajouter Projet"));
  return (
    <>
      <ul>
        {count.map((el) => {
          <li>{el}</li>;
        })}
      </ul>
    </>
  );
}
export default AddProject;
