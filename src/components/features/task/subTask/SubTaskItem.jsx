import { useDispatch } from "react-redux";
import { FiTrash } from "react-icons/fi";
import {
  TbCircle,
  TbProgressCheck,
  TbEditCircle,
  TbCircleCheck,
} from "react-icons/tb";
import { closeModal, openModal } from "../../../../store/modalSlice";
import { updateSubtask } from "../../../../services/subtaskService";
import Button from "../../../common/Button";
import useToast from "../../../../hooks/useToast";
import eventEmitter from "../../../../utils/eventEmitter";

const SubtaskItem = ({ data, loading, mode = "PRIVATE" }) => {
  const showToast = useToast();
  const dispatch = useDispatch();

  const handleChangeStatus = async (newStatus) => {
    try {
      if (data.status === newStatus) return;
      const response = await updateSubtask(data._id, { status: newStatus });
      if (response.status === 200) {
        eventEmitter.emit("subtaskChanged");
        showToast("SUCCESS", response.data.message);
        dispatch(closeModal());
      }
    } catch (error) {
      console.log(error);
      showToast("ERROR", error.response.data.message);
    }
  };

  return (
    <li className="border-t first:border-t-0 border-base-300 py-2 flex justify-between items-center gap-4">
      <p className="text-xs md:text-sm">{loading ? "..." : data.title}</p>
      <div className="flex items-center gap-2">
        <div className="dropdown dropdown-left dropdown-end z-[2] ml-auto">
          <Button
            size="sm"
            level={
              data.status === "toDo"
                ? "none"
                : data.status === "inProgress"
                ? "info"
                : data.status === "inReview"
                ? "warning"
                : data.status === "done" && "success"
            }
            square
            loading={loading}
          >
            {data.status === "toDo" ? (
              <TbCircle />
            ) : data.status === "inProgress" ? (
              <TbProgressCheck />
            ) : data.status === "inReview" ? (
              <TbEditCircle />
            ) : (
              data.status === "done" && <TbCircleCheck />
            )}
          </Button>
          <div
            tabIndex={0}
            className="dropdown-content w-48 p-2 z-[99] flex flex-col gap-2 mr-2 bg-base-200 rounded-xl box-shadow"
          >
            <Button
              size="sm"
              level="none"
              onClick={() => handleChangeStatus("toDo")}
              loading={loading}
            >
              <TbCircle /> To Do
            </Button>
            <Button
              size="sm"
              level="info"
              onClick={() => handleChangeStatus("inProgress")}
              loading={loading}
            >
              <TbProgressCheck /> In Progress
            </Button>
            <Button
              size="sm"
              level="warning"
              onClick={() => handleChangeStatus("inReview")}
              loading={loading}
            >
              <TbEditCircle />{" "}
              {mode === "PRIVATE" ? "In Review" : "Ask for Review"}
            </Button>
            {mode === "PRIVATE" && (
              <Button
                size="sm"
                level="success"
                onClick={() => handleChangeStatus("done")}
                loading={loading}
              >
                <TbCircleCheck /> Done
              </Button>
            )}
          </div>
        </div>
        {mode === "PRIVATE" && (
          <Button
            size="sm"
            level="error"
            square
            onClick={() =>
              dispatch(
                openModal({ key: "SUBTASK", type: "DELETE", _id: data._id })
              )
            }
            loading={loading}
          >
            <FiTrash />
          </Button>
        )}
      </div>
    </li>
  );
};

export default SubtaskItem;
