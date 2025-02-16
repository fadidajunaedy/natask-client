import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../../store/modalSlice"
import ModalCreateEmployee from "../../features/employee/ModalCreateEmployee"
import ModalConfirmDelete from "./ModalConfirmDelete"
import ModalCreateSubtask from "../../features/task/subTask/ModalCreateSubtask"
import Button from "../Button"
import ModalEditEmployee from "../../features/employee/ModalEditEmployee"
import ModalCreateTask from "../../features/task/ModalCreateTask"
import ModalEditSubTaskStatus from "../../features/task/subTask/ModalEditSubTaskStatus"
import ModalEditTask from "../../features/task/ModalEditTask"

const Modal = () => {
    const { key, type, isOpen } = useSelector((state) => state.modal)

    const dispatch = useDispatch()

    if (!isOpen || !key || !type) return null

    return isOpen && key && type && (
        <>
            <div className="fixed z-[98] w-full min-h-screen overflow-hidden bg-neutral/50 flex justify-center items-center p-4">
                <div style={{ maxHeight: "calc(100vh - 2rem)" }} className="z-[99] w-full max-w-xl overflow-y-auto bg-base-100 rounded-xl p-4">
                    {key === "EMPLOYEE" && type === "CREATE" && <ModalCreateEmployee />}
                    {key === "EMPLOYEE" && type === "EDIT" && <ModalEditEmployee/>}
                    {key === "TASK" && type === "CREATE" && <ModalCreateTask />}
                    {key === "TASK" && type === "EDIT" && <ModalEditTask />}
                    {key === "SUBTASK" && type === "CREATE" && <ModalCreateSubtask />}
                    {key === "SUBTASK_STATUS" && type === "EDIT" && <ModalEditSubTaskStatus />}
                    {type === "DELETE" && <ModalConfirmDelete />}
                    <Button type="button" level="secondary" onClick={() => dispatch(closeModal())} className="w-full mt-2">
                        Close
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Modal