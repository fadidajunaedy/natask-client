import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../../common/Heading";
import moment from "moment";
import Badge from "../../../common/Bagde";
import Button from "../../../common/Button";
import { IoArrowBack } from "react-icons/io5";
import { openModal } from "../../../../store/modalSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit3, FiLink, FiTrash } from "react-icons/fi";
import {
  TbCircle,
  TbProgressCheck,
  TbEditCircle,
  TbCircleCheck,
} from "react-icons/tb";
import SubTaskItem from "../../../features/task/subTask/SubTaskItem";
import SubTaskList from "../../../features/task/subTask/SubTaskList";
import Avatar from "../../../common/Avatar";
import { getTask } from "../../../../services/taskService";
import useToast from "../../../../hooks/useToast";
import eventEmitter from "../../../../utils/eventEmitter";
import { setTitle } from "../../../../store/titlePageSlice";

const DetailTask = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();

  const handleCopyLinkTask = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_CLIENT_URL}/task/${_id}`
    );
    showToast("INFO", "Task link successfully copied to clipboard");
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await getTask(_id, controller.signal);
        if (response.status === 200) setData(response.data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(error)
          showToast("ERROR", error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
    eventEmitter.on("taskChanged", fetchEmployees);

    return () => {
      controller.abort();
      eventEmitter.off("taskChanged", fetchEmployees);
    };
  }, [_id]);

  useEffect(() => {
    dispatch(setTitle({ title: "Detail Task" }));
  }, []);

  return (
    data && (
      <>
        <div className="max-w-24 mb-4">
          <Button level="none" size="lg" onClick={() => navigate(-1)}>
            <IoArrowBack /> Back
          </Button>
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:sticky lg:top-0 flex flex-col gap-4">
            <article className="flex flex-col gap-4 break-word bg-base-100 border border-base-200 rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-2">
                <Avatar
                  size="2em"
                  src={data.employee.photo}
                  alt={data.employee.name}
                />
                <span className="font-semibold">{data.employee.name}</span>
              </div>
              <div className="grow flex flex-col gap-4">
                <Heading level="h2" size="3xl">
                  {data.title}
                </Heading>
                <p className="opacity-80">{data.description}</p>
                <div className="flex flex-col gap-2">
                  <p>
                    <span className="font-semibold">Assigned at:</span>
                    &nbsp;
                    {moment(data.assignedAt).format("DD MMMM YYYY")}
                  </p>
                  <p>
                    <span className="font-semibold">Deadline at:</span>
                    &nbsp;
                    {moment(data.deadlineAt).format("DD MMMM YYYY")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-auto">
                  <Badge
                    level={
                      data.priority === "high"
                        ? `error`
                        : data.priority === "medium"
                        ? `warning`
                        : `info`
                    }
                  >
                    {data.priority.charAt(0).toUpperCase() +
                      data.priority.slice(1)}{" "}
                    Priority
                  </Badge>
                  <Badge level="none">{data.type}</Badge>
                </div>
              </div>
              <Button
                level="warning"
                size="lg"
                outline
                onClick={() =>
                  dispatch(openModal({ key: "TASK", type: "EDIT", data: data }))
                }
                className="grow"
              >
                <FiEdit3 />
              </Button>
              <Button
                level="info"
                size="lg"
                outline
                onClick={handleCopyLinkTask}
                className="grow"
              >
                <FiLink /> Share Task
              </Button>
            </article>
          </div>

          <div className="lg:col-span-2 bg-base-100 border border-base-200 rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center gap-2 mb-4">
              <Heading level="h3" size="2xl">
                Subtask
              </Heading>
              <Button
                level="primary"
                onClick={() =>
                  dispatch(
                    openModal({ key: "SUBTASK", type: "CREATE", _id: _id })
                  )
                }
              >
                + Create
              </Button>
            </div>
            <SubTaskList taskId={data._id} />
          </div>
        </div>
      </>
    )
  );
};

export default DetailTask;
