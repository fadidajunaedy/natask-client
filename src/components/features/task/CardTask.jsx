import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";
import { IoArrowForward } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { getAllSubtask } from "../../../services/subtaskService";

import moment from "moment";
import Button from "../../common/Button";
import Badge from "../../common/Bagde";
import Avatar from "../../common/Avatar";
import Heading from "../../common/Heading";
import eventEmitter from "../../../utils/eventEmitter";

const CardTask = ({ task }) => {
  const [subtasks, setSubtasks] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const handleGetSubtask = async () => {
      try {
        const response = await getAllSubtask(
          { taskId: task._id },
          controller.signal
        );
        if (response.success) setSubtasks(response.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(error);
        }
      }
    };
    handleGetSubtask();
    eventEmitter.on("subtaskChanged", handleGetSubtask);

    return () => {
      controller.abort();
      eventEmitter.off("subtaskChanged", handleGetSubtask);
    };
  }, [task]);

  const subtaskProgressPercentage = useMemo(() => {
    const completedSubTasks = subtasks.filter(
      (subtask) => subtask.status === "done"
    ).length;
    const percentage =
      subtasks.length > 0 ? (completedSubTasks / subtasks.length) * 100 : 0;

    return percentage;
  }, [subtasks]);

  return (
    <>
      <article className="flex flex-col gap-2 break-word bg-base-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Avatar
            size="1.5em"
            src={task.employee.photo}
            alt={task.employee.name}
          />
          <span className="text-sm font-semibold opacity-80">
            {task.employee.name}
          </span>
        </div>
        <div className="grow flex flex-col gap-2">
          <Heading level="h3" size="md" className="line-clamp-2">
            {task.title}
          </Heading>
          <p className="text-sm line-clamp-3 opacity-80">{task.description}</p>
          <div className="flex flex-col gap-2 mb-2">
            <p className="text-xs opacity-80">
              <span className="font-semibold">Assigned at:</span>
              &nbsp;
              {moment(task.assignedAt).format("DD MMMM YYYY")}
            </p>
            <p className="text-xs opacity-80">
              <span className="font-semibold">Deadline at:</span>
              &nbsp;
              {moment(task.deadlineAt).format("DD MMMM YYYY")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge
              level={
                task.priority === "high"
                  ? `error`
                  : task.priority === "medium"
                  ? `warning`
                  : `info`
              }
              size="sm"
              soft
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
              Priority
            </Badge>
            <Badge size="sm" level="primary" soft>
              {task.type}
            </Badge>
          </div>
          {/* <progress
            className="progress progress-lg progress-primary w-full mt-auto mb-2"
            value={subtaskProgressPercentage}
            max="100"
          ></progress> */}
          <div className="flex justify-end items-center gap-2 mt-auto">
            <Button
              size="sm"
              level="error"
              square
              outline
              onClick={() =>
                dispatch(
                  openModal({ key: "TASK", type: "DELETE", _id: task._id })
                )
              }
            >
              <FiTrash />
            </Button>
            <Link to={`/dashboard/task/${task._id}`}>
              <Button size="sm" level="primary" outline>
                Detail
                <IoArrowForward />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default CardTask;
