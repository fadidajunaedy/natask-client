import { TbCircle, TbProgressCheck, TbEditCircle, TbCircleCheck } from "react-icons/tb"
import Button from "../../../common/Button"

const DetailSubTaskItem = ({ subTask }) => {
    return (
        <li key={subTask._id} className="border-t first:border-t-0 border-base-300 py-4 flex justify-between items-center gap-4">
            <p>{subTask.title}</p>
            <Button 
                level={
                    subTask.status === "toDo" ? "none" :
                    subTask.status === "inProgress" ? "info" :
                    subTask.status === "inReview" ? "warning" :
                    subTask.status === "done" && "success" 
                }
                square
            >
            {
                subTask.status === "toDo" ? <TbCircle /> :
                subTask.status === "inProgress" ? <TbProgressCheck /> :
                subTask.status === "inReview" ? <TbEditCircle /> :
                subTask.status === "done" && <TbCircleCheck /> 
            }
        </Button>
    </li>
    )
}

export default DetailSubTaskItem
