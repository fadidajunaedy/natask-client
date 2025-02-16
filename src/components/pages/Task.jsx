import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Heading from "../common/Heading"
import moment from "moment"
import Badge from "../common/Bagde"
import Avatar from "../common/Avatar"
import SubTaskList from "../features/task/subTask/SubTaskList"

const Task = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const { _id } = useParams()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
    
        const fetchTasks = async () => {
            setLoading(true)
                
            try {
                const request = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${_id}`, { signal })
                const response = await request.json()
                console.log(response)
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
    }, [ _id])

    return data && (
        <>  
            <main className="w-full min-h-screen flex justify-center items-center bg-base-200 p-4">
                <article className="max-w-lg flex flex-col gap-4 break-word bg-base-100 border border-base-200 rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                        <Avatar 
                            size="2em" 
                            src={`${import.meta.env.VITE_API_URL}/files/employee/photo/${data.employee.photo}`} 
                            alt={data.employee.name}
                        />
                        <span className="font-semibold">
                            {data.employee.name}
                        </span>        
                    </div>
                    <div className="grow flex flex-col gap-4">
                        <Heading level="h2" size="3xl">{data.title}</Heading>
                        <p className="opacity-80">{data.description}</p>
                        <div className="flex flex-col gap-2">
                            <p>
                                <span className="font-semibold">Assigned at:</span>
                                &nbsp;
                                {moment(data.assignedAt).format("DD MMMM YYYY")}
                            </p>
                            <p>
                                <span className="font-semibold">Deadline at:</span>
                                &nbsp;
                                {moment(data.deadlineAt).format("DD MMMM YYYY")}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-auto">
                            <Badge 
                                level={
                                    data.priority === "high" ? `error` : 
                                    data.priority === "medium" ? `warning` : `info`
                                }
                            >
                                {data.priority.charAt(0).toUpperCase() + data.priority.slice(1)} Priority
                            </Badge>
                            <Badge level="none">
                                {data.type}
                            </Badge>
                        </div>
                    </div>
                    <SubTaskList taskId={_id} viewMode="PUBLIC" />
                </article>
            </main>

        </>
    )
}

export default Task