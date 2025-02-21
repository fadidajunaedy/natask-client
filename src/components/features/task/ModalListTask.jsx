import { useDispatch, useSelector } from "react-redux";
import Heading from "../../common/Heading";
import Avatar from "../../common/Avatar";
import moment from "moment";
import Badge from "../../common/Bagde";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import { IoArrowForward } from "react-icons/io5";
import { closeModal } from "../../../store/modalSlice";

const ModalListTask = () => {
  const { data } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col gap-4">
        {data.length > 0 ? (
          data.map((task) => (
            <article
              key={task._id}
              className="flex flex-col gap-2 break-word bg-base-100 border border-base-200 shadow-lg rounded-xl p-4"
            >
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
                <p className="text-sm line-clamp-3 opacity-80">
                  {task.description}
                </p>
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
                    size="xs"
                    soft
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}{" "}
                    Priority
                  </Badge>
                  <Badge level="primary" size="xs" soft>
                    {task.type}
                  </Badge>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <Link
                    to={`/dashboard/task/${task._id}`}
                    onClick={() => dispatch(closeModal())}
                  >
                    <Button size="sm" level="primary" outline>
                      Detail
                      <IoArrowForward />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <span className="text-center italic p-4 opacity-60">
            No task found
          </span>
        )}
      </div>
    </>
  );
};

export default ModalListTask;
