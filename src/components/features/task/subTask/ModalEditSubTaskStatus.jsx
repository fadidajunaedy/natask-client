import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import Button from "../../../common/Button"
import { TbCircle, TbCircleCheck, TbEditCircle, TbProgressCheck } from "react-icons/tb"
import { closeModal } from "../../../../store/modalSlice"
import Heading from "../../../common/Heading"

const ModalEditSubTaskStatus = () => {
    const [loading, setLoading] = useState(false)
    
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { data: subTask } = useSelector((state) => state.modal)

    const handleChangeStatus = async (newStatus) => {
        setLoading(false)
        
        try {
            if (subTask.status === status) return
            const request = await fetch(`${import.meta.env.VITE_API_URL}/api/sub-tasks/${subTask._id}`, { 
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            })
            const response = await request.json()
            console.log(response)
            if (response.success) {
                dispatch(closeModal())
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>

            <div className="flex flex-col gap-2">
            <Heading level="h2" size="3xl" align="center">Edit Status</Heading>
                <Button level="none" onClick={() => handleChangeStatus("to_do")}>
                            <TbCircle /> To Do
                        </Button>
                        <Button level="info" onClick={() => handleChangeStatus("in_progress")}>
                            <TbProgressCheck /> In Progress
                        </Button>
                        <Button level="warning" onClick={() => handleChangeStatus("in_review")}>
                            <TbEditCircle /> In Review
                        </Button>
                        <Button level="success" onClick={() => handleChangeStatus("done")}>
                            <TbCircleCheck /> Done
                        </Button>
            </div>
        </>
    )
}

export default ModalEditSubTaskStatus