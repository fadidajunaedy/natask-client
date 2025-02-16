import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/modalSlice";
import { IoArrowForward } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

import Heading from "../../common/Heading";
import Avatar from "../../common/Avatar";
import Badge from "../../common/Bagde";
import moment from "moment";

const CardTask = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <>
      <article className="flex flex-col gap-4 break-word bg-base-100 border border-base-200 shadow-lg rounded-xl p-4">
        <div className="flex items-center gap-2">
          <Avatar
            size="2em"
            src={task.employee.photo}
            alt={task.employee.name}
          />
          <span className="font-semibold">{task.employee.name}</span>
          <p className="text-sm ml-auto">
            {moment(task.assignedAt).format("DD MMMM YYYY")}
          </p>
        </div>
        <div className="grow flex flex-col gap-2">
          <Heading level="h3" size="xl">
            {task.title}
          </Heading>
          <p className="text-sm opacity-80 mb-4">{task.description}</p>
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
          <div className="flex justify-end items-center gap-2 mt-auto">
            <Button
              level="error"
              square
              onClick={() =>
                dispatch(
                  openModal({ key: "TASK", type: "DELETE", _id: task._id })
                )
              }
            >
              <FiTrash />
            </Button>
            <Link to={`/dashboard/task/${task._id}`}>
              <Button level="primary">
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
