import moment from "moment";
import Heading from "../../common/Heading";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../common/Avatar";
import { TbLayoutDashboard, TbUsers, TbCircleCheck } from "react-icons/tb";

import { BiTask } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import LoadingAnimation from "../../widget/LoadingAnimation";
import CardDetailTask from "../../features/task/CardDetailTask";
import Calendar from "../../widget/Calendar";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token, data: userData } = useSelector((state) => state.auth);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEmployees = async () => {
      setLoading(true);

      try {
        const [dashboardResponse, tasksResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
            signal,
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
            signal,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const dashboardData = await dashboardResponse.json();
        const tasksData = await tasksResponse.json();

        setData(dashboardData.data);
        setTasks(tasksData.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

    return () => controller.abort();
  }, [token]);

  return (
    <>
      {/* <div className="bg-base-100 rounded-xl shadow-lg p-4 mb-8">
                <Heading level="h1" size="4xl" className="mb-2">Welcome Back, <span className="text-primary">{userData.name}</span></Heading>
                <Heading level="h2" size="2xl" className="mb-4">Keep Your Team on Track, Effortlessly.</Heading>
                <p className="text-lg opacity-80">
                    Monitor employee tasks, track progress, and ensure everything runs smoothly. With Natatask, managing assignments and deadlines has never been easier! 🚀
                </p>
            </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">Total Employee</div>
            <div className="text-4xl font-bold">{data.total_employee}</div>
          </div>
          <TbUsers size={48} />
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">Total Task</div>
            <div className="text-4xl font-bold">{data.total_task}</div>
          </div>
          <BiTask size={48} />
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">Total Subtask</div>
            <div className="text-4xl font-bold">{data.total_sub_task}</div>
          </div>
          <GoTasklist size={48} />
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">
              Employee that have active task
            </div>
          </div>
          <div className="text-4xl font-bold">{data.total_active_employee}</div>
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">Completed Task</div>
            <div className="text-sm opacity-80 mb-2">
              {data.completed_task}/{data.total_task}
            </div>
          </div>
          <div className="text-4xl font-bold">
            {data.completed_task_percentage}%
          </div>
        </div>
        <div className="card-stat">
          <div>
            <div className="text-sm opacity-80 mb-2">Completed Sub Task</div>
            <div className="text-sm opacity-80 mb-2">
              {data.completed_sub_task}/{data.total_sub_task}
            </div>
          </div>
          {/* For TSX uncomment the commented types below */}
          <div
            className="radial-progress bg-base-100  text-primary border-base-100 border-4"
            style={
              {
                "--value": data.completed_sub_task_percentage,
              } /* as React.CSSProperties */
            }
            aria-valuenow={data.completed_sub_task_percentage}
            role="progressbar"
          >
            {data.completed_sub_task_percentage}%
          </div>
          {/* <div className="text-4xl font-bold">{data.completed_sub_task_percentage}%</div> */}
        </div>
      </div>
      <Calendar data={tasks} />
      {/* <Heading level="h2" size="2xl" className="mb-4">
        Ongoing Task
      </Heading>
      <div className="flex gap-4 overflow-y-visible overflow-x-auto">
        {loading ? (
          <div className="md:col-span-2 xl:col-span-3 flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : tasks.length > 0 ? (
          tasks
            .filter((task) => new Date(task.deadlineAt) >= new Date())
            .map((task) => <CardDetailTask key={task.id} task={task} />)
        ) : (
          <div className="col-span-1 md:col-span-4 lg:col-span-3 text-center text-slate-400 italic py-8">
            Employee not found
          </div>
        )}
      </div> */}
    </>
  );
};

export default Dashboard;
