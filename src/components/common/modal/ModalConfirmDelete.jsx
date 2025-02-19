import { useDispatch, useSelector } from "react-redux";
import Heading from "../../common/Heading";
import Button from "../Button";
import { useState } from "react";
import { closeModal } from "../../../store/modalSlice";
import useToast from "../../../hooks/useToast";
import eventEmitter from "../../../utils/eventEmitter";

const deleteFunctionMap = {
  EMPLOYEE: async () =>
    (await import("../../../services/employeeService")).deleteEmployee,
  TASK: async () => (await import("../../../services/taskService")).deleteTask,
  SUBTASK: async () =>
    (await import("../../../services/subtaskService")).deleteSubtask,
};

const emitterMap = {
  EMPLOYEE: "employeeChanged",
  TASK: "taskChanged",
  SUBTASK: "subtaskChanged",
};

const ModalConfirmDelete = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const showToast = useToast();

  const { key, _id } = useSelector((state) => state.modal);

  const handleDelete = async () => {
    setLoading(true);

    try {
      if (!deleteFunctionMap[key]) throw new Error("KEY FUNCTION NOT FOUND");
      if (!emitterMap[key]) throw new Error("KEY EMITTER NOT FOUND");

      const deleteFunction = await deleteFunctionMap[key]();
      const response = await deleteFunction(_id);

      if (response.status === 200) {
        eventEmitter.emit(emitterMap[key]);
        showToast("SUCCESS", response.data.message);
        dispatch(closeModal());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Heading level="h2" size="2xl" align="center">
          Delete Confirmation
        </Heading>
        <p className="text-center">
          Are you sure you want to delete this data?
        </p>
        <Button
          level="primary"
          onClick={handleDelete}
          className="w-full"
          loading={loading}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export default ModalConfirmDelete;
