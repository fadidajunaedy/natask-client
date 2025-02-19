import { useState } from "react";
import Button from "../../../common/Button";
import {
  TbCircle,
  TbProgressCheck,
  TbEditCircle,
  TbCircleCheck,
} from "react-icons/tb";
import { useDispatch } from "react-redux";
import { FiTrash } from "react-icons/fi";
import { closeModal, openModal } from "../../../../store/modalSlice";
import { updateSubtask } from "../../../../services/subtaskService";
import useToast from "../../../../hooks/useToast";
import eventEmitter from "../../../../utils/eventEmitter";

const SubTaskItem = ({ subTask, viewMode = "DASHBOARD" }) => {
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const dispatch = useDispatch();

  const handleChangeStatus = async (newStatus) => {
    setLoading(true);
    try {
      if (subTask.status === newStatus) return;
      const response = await updateSubtask(subTask._id, { status: newStatus });
      if (response.status === 200) {
        eventEmitter.emit("subtaskChanged");
        showToast("SUCCESS", response.data.message);
        dispatch(closeModal());
      }
    } catch (error) {
      console.log(error);
      showToast("ERROR", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="border-t first:border-t-0 border-base-300 py-2 flex justify-between items-center gap-4">
      <p>{subTask.title}</p>
      <div className="flex items-center gap-2">
        <div className="dropdown dropdown-left dropdown-end z-[2] ml-auto">
          <Button
            level={
              subTask.status === "toDo"
                ? "none"
                : subTask.status === "inProgress"
                ? "info"
                : subTask.status === "inReview"
                ? "warning"
                : subTask.status === "done" && "success"
            }
            square
          >
            {subTask.status === "toDo" ? (
              <TbCircle />
            ) : subTask.status === "inProgress" ? (
              <TbProgressCheck />
            ) : subTask.status === "inReview" ? (
              <TbEditCircle />
            ) : (
              subTask.status === "done" && <TbCircleCheck />
            )}
          </Button>
          <div
            tabIndex={0}
            className="dropdown-content w-48 p-2 z-[99] flex flex-col gap-2 mr-2 bg-base-200 rounded box-shadow"
          >
            <Button
              level="none"
              onClick={() => handleChangeStatus("toDo")}
              loading={loading}
            >
              <TbCircle /> To Do
            </Button>
            <Button
              level="info"
              onClick={() => handleChangeStatus("inProgress")}
              loading={loading}
            >
              <TbProgressCheck /> In Progress
            </Button>
            <Button
              level="warning"
              onClick={() => handleChangeStatus("inReview")}
              loading={loading}
            >
              <TbEditCircle />{" "}
              {viewMode === "DASHBOARD" ? "In Review" : "Ask for Review"}
            </Button>
            {viewMode === "DASHBOARD" && (
              <Button
                level="success"
                onClick={() => handleChangeStatus("done")}
                loading={loading}
              >
                <TbCircleCheck /> Done
              </Button>
            )}
          </div>
        </div>
        {viewMode === "DASHBOARD" && (
          <Button
            level="error"
            square
            onClick={() =>
              dispatch(
                openModal({ key: "SUBTASK", type: "DELETE", _id: subTask._id })
              )
            }
          >
            <FiTrash />
          </Button>
        )}
      </div>
    </li>
  );
};

export default SubTaskItem;
