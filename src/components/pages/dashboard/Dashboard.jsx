import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BiTask } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { TbUsers } from "react-icons/tb";
import { setTitle } from "../../../store/titlePageSlice";
import { getDataDashboard } from "../../../services/dashboardService";
import { getAllTask } from "../../../services/taskService";

import Calendar from "../../widget/Calendar";
import useToast from "../../../hooks/useToast";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const showToast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const handleGetData = async () => {
      setLoading(true);
      try {
        const responseDashboard = await getDataDashboard(controller.signal);
        if (responseDashboard.status === 200)
          setData(responseDashboard.data.data);

        const responseTasks = await getAllTask(controller.signal);
        if (responseTasks.status === 200) setTasks(responseTasks.data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(error);
          showToast("ERROR", error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    handleGetData();
    dispatch(setTitle({ title: "Dashboard" }));
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">Total Employee</div>
            <div className="text-4xl font-bold">
              {loading ? "..." : data.total_employee}
            </div>
          </div>
          <TbUsers size={56} className="stroke-primary" />
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">Total Task</div>
            <div className="text-4xl font-bold">
              {loading ? "..." : data.total_task}
            </div>
          </div>
          <BiTask size={56} className="fill-primary" />
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">Total Subtask</div>
            <div className="text-4xl font-bold">
              {loading ? "..." : data.total_sub_task}
            </div>
          </div>
          <GoTasklist size={56} className="fill-primary" />
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80">
              Employee that have active task
            </div>
          </div>
          <div className="text-primary text-4xl font-bold">
            {loading ? "..." : data.total_active_employee}
          </div>
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80">Completed Task</div>
          </div>
          <div className="text-primary text-4xl font-bold">
            {loading ? "..." : data.completed_task}/
            {loading ? "..." : data.total_task}
          </div>
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80">Completed Sub Task</div>
          </div>
          <div className="text-primary text-4xl font-bold">
            {loading ? "..." : data.completed_sub_task}/
            {loading ? "..." : data.total_sub_task}
          </div>
        </div>
      </div>
      <Calendar data={tasks} />
    </>
  );
};

export default Dashboard;
