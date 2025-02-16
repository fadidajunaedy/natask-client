import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import SubTaskItem from "./SubTaskItem"
import { getAllSubtask } from "../../../../services/subTaskService"
import eventEmitter from "../../../../utils/eventEmitter"
import useToast from "../../../../hooks/useToast"

const SubTaskList = ({ taskId, viewMode = "DASHBOARD" }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const showToast = useToast()
    
    useEffect(() => {
        const controller = new AbortController()
        
        const fetchEmployees = async () => {
            setLoading(true)
            try {
                const response = await getAllSubtask({ taskId: taskId }, controller.signal)
                if (response.success) setData(response.data)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted")
                } else {
                    showToast("ERROR", error.message)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchEmployees()
        const ws = new WebSocket('ws://localhost:3000')
        ws.onmessage = (event) => {
            console.log(event)
          };
        eventEmitter.on("subtaskChanged", fetchEmployees)
        // socket.on("subtaskUpdated", (updatedSubTask) => {
        //     setData((prevSubTasks) =>
        //         prevSubTasks.map((subtask) =>
        //             subtask._id === updatedSubTask._id ? updatedSubTask : subtask
        //         )
        //     )
        // })
        return () => {
            controller.abort()
            eventEmitter.off("subtaskChanged", fetchEmployees)
            ws.close()
            // socket.off("subtaskUpdated")
        }
    }, [taskId])

    return (
        <ul>
            {data.length > 0 && data.map(subTask => (
                <SubTaskItem key={subTask._id} subTask={subTask} viewMode={viewMode} />
            ))}
        </ul>
    )
}

export default SubTaskList