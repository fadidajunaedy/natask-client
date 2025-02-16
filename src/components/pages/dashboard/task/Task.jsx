import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { IoFilterSharp} from "react-icons/io5"
import { GoSortAsc, GoSortDesc } from "react-icons/go"
import { getAllTask } from "../../../../services/taskService"
import { openModal } from "../../../../store/modalSlice"
import Button from "../../../common/Button"
import Input from "../../../common/Input"
import useDebounce from "../../../../hooks/useDebounce"
import CardTask from "../../../features/task/CardTask"
import LoadingAnimation from "../../../widget/LoadingAnimation"
import useToast from "../../../../hooks/useToast"
import eventEmitter from "../../../../utils/eventEmitter"

const arraySortsBy = [
    {
        value: "title",
        label: "Title"
    },
    {
        value: "priority",
        label: "Priority"
    },
    {
        value: "assignedAt",
        label: "Assigned At"
    },
    {
        value: "deadlineAt",
        label: "Deadline At"
    },
]

const Task = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [keyword, setKeyword] = useState("")
    const [sortBy, setSortBy] = useState("assignedAt")
    const [sortMode, setSortMode] = useState("Ascendant")

    const showToast = useToast()
    const dispatch = useDispatch()
    const debounceKeyword = useDebounce(keyword)
    
    useEffect(() => {
        const controller = new AbortController()
        
        const fetchEmployees = async () => {
            setLoading(true)
            try {
                const response = await getAllTask(controller.signal)
                console.log(response)
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
        eventEmitter.on("taskChanged", fetchEmployees)

        return () => {
            controller.abort()
            eventEmitter.off("taskChanged", fetchEmployees)
        }
    }, [])

    const filteredData = useMemo(() => {
        let result = data

        if (debounceKeyword.trim() !== "") {
            result = result.filter(employee =>
                employee.title.toLowerCase().includes(debounceKeyword.toLowerCase())
            )
        }

        if (sortBy) {
            if (sortBy === "title" || sortBy === "priority") {
                if (sortMode === "Ascendant") {
                    result = result.sort((a, b) => a.title.localeCompare(b.title))
                } else {
                    result = result.sort((a, b) => b.title.localeCompare(a.title))
                }
            } else {
                if (sortMode === "Ascendant") {
                    result = result.sort((a, b) => new Date(b[sortBy]) - new Date(a[sortBy]))
                } else {
                    result = result.sort((a, b) => new Date(a[sortBy]) - new Date(b[sortBy]))
                }
            }
        }

        return result
    }, [data, debounceKeyword, sortMode, sortBy])

    return (
        <>  
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                <div className="w-full flex items-center gap-2">
                    <div className="dropdown dropdown-start">
                        <Button size="lg" level="primary" square>
                            <IoFilterSharp />
                        </Button>
                        <div tabIndex={0} className="dropdown-content menu w-52 bg-base-100 border border-base-200 rounded-xl shadow-lg mt-4 p-4 gap-4">
                            <span className="text-center">Filter By:</span>
                        {arraySortsBy.map((sort, index) => (
                        <Button 
                            key={index}
                            level={sortBy === sort.value ? `primary` : `none`} 
                            onClick={() => setSortBy(sort.value)}
                        >
                            {sort.label}
                        </Button>
                        ))}
                        </div>
                    </div>
                    <Button size="lg" level="primary" onClick={() => setSortMode(prev => prev==="Ascendant" ? "Descendant" : "Ascendant")} square>
                        {sortMode === "Ascendant" ? <GoSortAsc /> : <GoSortDesc />}
                    </Button>
                    <Input 
                        type="search" 
                        size="lg"
                        name="search" 
                        placeholder="Search..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} 
                    />
                </div>
                <div className="xl:col-start-3 w-full flex justify-end items-center gap-4">
                    <Button size="lg" level="primary" onClick={() => dispatch(openModal({ key: "TASK", type: "CREATE"}))} className="grow">
                        + Create Task
                    </Button>
                </div>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading ? (
                <div className="md:col-span-2 xl:col-span-3 flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            ) : filteredData.length > 0 ? (
                filteredData.map(task => (
                    <CardTask key={task.id} task={task} />
                ))
            ) : 
                <div className="col-span-1 md:col-span-4 lg:col-span-3 text-center text-slate-400 italic py-8">
                    Task not found
                </div>
            }
            </section>
            {/* <TableTask data={filteredData} /> */}
        </>
    )
}

export default Task