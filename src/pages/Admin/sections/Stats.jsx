import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux/navActions";
import RadialBar from "../../../Components/charts/RadialBar";
import StatCard from "../../../Components/cards/StatCard";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
export default function Stats(props) {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(0);
  const [projectId, setProjectId] = useState("");
  const [nonFinishedTasks, setNonFinishedTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [progressRate, setProgressRate] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [statTasks, setStatTasks] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Statistiques"));
    axios
      .get("/projets")
      .then((res) => {
        console.log(res.data["hydra:member"]);
        const all = res.data["hydra:member"];
        setProjects(all);
        return axios({
          method: "get",
          url: "/taches",
        });
      })
      .then((res) => {
        setTasks(res.data["hydra:member"]);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  function filterTasks(e) {
    if (e.target.value !== "") {
      const t = tasks.filter(
        (x) => parseInt(e.target.value) === parseInt(x.projet.id)
      );
      const p = Math.floor(
        t.reduce((a, x) => a + x.tauxAvancement, 0) / t.length
      );
      setProgressRate(p);
      setStatTasks(t);
    } else {
      setStatTasks([]);
    }
  }
  return loading ? (
    <div class="spinner-border  text-primary m-5" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  ) : (
    <div className=" fadein">
      <div className="row g-5 g-xl-8">
        <div className="col-xl-3">
          <div className="card bg-primary card-xl-stretch mb-xl-8">
            <div className="card-body my-3">
              <span className="card-title fw-bolder text-inverse-success fs-5 mb-3 d-block">
                Projets Total:
              </span>
              <div className="py-1">
                <span className="text-inverse-success fs-1 fw-bolder me-2">
                  {projects.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3">
          <div className="card bg-success card-xl-stretch mb-xl-8">
            <div className="card-body my-3">
              <span className="card-title fw-bolder text-inverse-success fs-5 mb-3 d-block">
                Projets finis:
              </span>
              <div className="py-1">
                <span className="text-inverse-success fs-1 fw-bolder me-2">
                  {projects.filter((x) => x.etat === "2").length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3">
          <div className="card bg-danger card-xl-stretch mb-xl-8">
            <div className="card-body my-3">
              <span className="card-title fw-bolder text-inverse-success fs-5 mb-3 d-block">
                Projets En Cours:
              </span>
              <div className="py-1">
                <span className="text-inverse-success fs-1 fw-bolder me-2">
                  {projects.filter((x) => x.etat === "1").length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3">
          <div className="card bg-info card-xl-stretch mb-xl-8">
            <div className="card-body my-3">
              <span className="card-title fw-bolder text-inverse-success fs-5 mb-3 d-block">
                Projets Non entamés:
              </span>
              <div className="py-1">
                <span className="text-inverse-success fs-1 fw-bolder me-2">
                  {projects.filter((x) => x.etat === "0").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <label className="col-lg-1 col-form-label fw-bold fs-6">Projet</label>
        <div className="col-lg-2">
          <select
            onChange={(e) => filterTasks(e)}
            className="form-select form-select-transparent"
          >
            <option value=""></option>
            {projects.map((x) => (
              <option value={x.id}>{x.titre}</option>
            ))}
          </select>
        </div>
      </div>

      {statTasks.length > 0 ? (
        <div className="row g-5 g-xl-8 fadein ">
          <div className="col-xl-4">
            <RadialBar chartColor={"success"} value={[progressRate]} />
          </div>
          <div className="col-xl-4">
            <StatCard
              title={"Tâches Finis"}
              tasks={statTasks.filter((x) => x.etatTache === "2")}
              color={"bg-success"}
            />
          </div>
          <div className="col-xl-4">
            <StatCard
              title={"Tâches En Cours"}
              color={"bg-danger"}
              tasks={statTasks.filter((x) => {
                return x.etatTache === "1" || x.etatTache === "0";
              })}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
