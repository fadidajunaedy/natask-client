import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/modalSlice";
import { IoArrowForward } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { getAllSubtask } from "../../../services/subTaskService";

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
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      console.log(event);
    };

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
      <article className="flex flex-col gap-4 break-word bg-base-100 border border-base-200 shadow-lg rounded-xl p-4">
        <div className="flex items-center gap-2">
          <Avatar
            size="2em"
            src={`${import.meta.env.VITE_API_URL}/files/employee/photo/${
              task.employee.photo
            }`}
            alt={task.employee.name}
          />
          <span className="font-semibold">{task.employee.name}</span>
        </div>
        <div className="grow flex flex-col gap-2">
          <Heading level="h3" size="xl">
            {task.title}
          </Heading>
          <p className="text-sm opacity-80 mb-2">{task.description}</p>
          <div className="flex flex-col gap-2 mb-4">
            <p>
              <span className="font-semibold">Assigned at:</span>
              &nbsp;
              {moment(task.assignedAt).format("DD MMMM YYYY")}
            </p>
            <p>
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
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
              Priority
            </Badge>
            <Badge level="none" size="sm">
              {task.type}
            </Badge>
          </div>
          <progress
            className="progress progress-lg progress-primary w-full mt-auto mb-2"
            value={subtaskProgressPercentage}
            max="100"
          ></progress>
          <div className="flex justify-end items-center gap-2">
            <Button
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
              <Button level="primary" outline>
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
