import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux/navActions";
import Moment from "moment";
import { Chart } from "react-google-charts";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
export default function ViewProjectMonitoring(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projet, setProjet] = useState({});
  const projectId = props.match.params.id;
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch();
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 40,
    },
  };

  useEffect(() => {
    axios
      .get("/taches")
      .then((res) => {
        const response = res.data["hydra:member"].filter(
          (x) => parseInt(x.projet.id) === parseInt(projectId)
        );
        console.log(response[0]);
        setProjectName(response[0].projet.titre);

        const tasks = response.map((x) => [
          x.id,
          x.titreTache,
          x.module,
          new Date(
            x.dateDebutTache.split("-")[0],
            x.dateDebutTache.split("-")[1],
            x.dateDebutTache.split("-")[2]
          ),
          new Date(
            x.dateFinTache.split("-")[0],
            x.dateFinTache.split("-")[1],
            x.dateFinTache.split("-")[2]
          ),
          null,
          x.tauxAvancement,
          null,
        ]);

        setData([columns, ...tasks]);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div class="spinner-border  text-primary m-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="row g-5 g-xl-8">
          <div className="col-xl-12">
            <div className="card card-xl-stretch mb-xl-8">
              <div className="card-header border-0">
                <h3 class="card-title fw-bolder text-dark">
                  Suivi projet pour {projectName}
                </h3>
              </div>
              <div class="card-body w-100 ">
                {" "}
                <Chart
                  chartType="Gantt"
                  width="100%"
                  height="50%"
                  data={data}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
