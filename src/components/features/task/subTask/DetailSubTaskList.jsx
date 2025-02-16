import { useEffect, useState } from "react"
import DetailSubTaskItem from "./DetailSubTaskItem"
import SubTaskItem from "./SubTaskItem"

const DetailSubTaskList = ({ taskId }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
    
        const fetchTasks = async () => {
            setLoading(true)
                
            try {
                const request = await fetch(`${import.meta.env.VITE_API_URL}/api/sub-tasks?task_id=${taskId}`, { signal })
                const response = await request.json()
                setData(response.data)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted")
                } else {
                    console.log(error)
                }
            } finally {
                setLoading(false)
            }
        }
    
        fetchTasks()
    
        return () => controller.abort()
    }, [taskId])

    return (
        <ul>
            {data.length > 0 && data.map(subTask => (
                <SubTaskItem key={subTask._id} subTask={subTask}/>
            ))}
        </ul>
    )
}

export default DetailSubTaskList