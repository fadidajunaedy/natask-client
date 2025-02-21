import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/modalSlice";
import ModalConfirmDelete from "./ModalConfirmDelete";
import ModalCreateEmployee from "../../features/employee/ModalCreateEmployee";
import ModalEditEmployee from "../../features/employee/ModalEditEmployee";
import ModalCreateTask from "../../features/task/ModalCreateTask";
import ModalEditTask from "../../features/task/ModalEditTask";
import ModalListTask from "../../features/task/ModalListTask";
import ModalCreateSubtask from "../../features/task/subTask/ModalCreateSubtask";
import Button from "../Button";
import ModalConfirmLogout from "./ModalConfirmLogout";

const Modal = () => {
  const { key, type, isOpen } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  if (!isOpen || !key || !type) return null;

  return (
    isOpen &&
    key &&
    type && (
      <>
        <div className="fixed z-[98] w-full min-h-screen overflow-hidden bg-neutral/50 flex justify-center items-center p-4">
          <div
            style={{ maxHeight: "calc(100vh - 2rem)" }}
            className="relative z-[99] w-full max-w-xl overflow-y-auto bg-base-100 rounded-xl p-4"
          >
            {key === "EMPLOYEE" && type === "CREATE" && <ModalCreateEmployee />}
            {key === "EMPLOYEE" && type === "EDIT" && <ModalEditEmployee />}
            {key === "TASK" && type === "CREATE" && <ModalCreateTask />}
            {key === "TASK" && type === "EDIT" && <ModalEditTask />}
            {key === "TASK" && type === "LIST" && <ModalListTask />}
            {key === "SUBTASK" && type === "CREATE" && <ModalCreateSubtask />}
            {type === "DELETE" && <ModalConfirmDelete />}
            {key === "AUTH" && type === "LOGOUT" && <ModalConfirmLogout />}
            <Button
              type="button"
              level="secondary"
              onClick={() => dispatch(closeModal())}
              className="w-full mt-2"
            >
              Close
            </Button>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
