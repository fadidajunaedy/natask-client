import { BsThreeDotsVertical } from "react-icons/bs"
import Button from "../../common/Button"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../../store/modalSlice"
import { IoArrowForward } from "react-icons/io5"
import { FiTrash } from "react-icons/fi"
import {Link } from "react-router-dom"

import Heading from "../../common/Heading"
import Avatar from "../../common/Avatar"
import Badge from "../../common/Bagde"
import moment from "moment"
import { TbCircle, TbCircleCheck, TbEditCircle, TbProgressCheck } from "react-icons/tb"
import DetailSubTaskList from "./subTask/DetailSubTaskList"
import SubTaskList from "./subTask/SubTaskList"

const CardDetailTask = ({ task }) => {
    return (
        <>
            <article className="carousel-item h-[fit-content] max-w-xs flex flex-col gap-4 break-word bg-base-100 rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-2">
                    <Avatar 
                        size="2em" 
                        type="circle" 
                        src={`${import.meta.env.VITE_API_URL}/files/employee/photo/${task.employee.photo}`} 
                        alt={task.employee.name}
                    />
                    <span className="font-semibold">
                        {task.employee.name}
                    </span>        
                </div>
                <div className="flex flex-col gap-2">
                    <Heading level="h3" size="xl">{task.title}</Heading>
                    <p className="text-sm mb-4">{task.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                        <Badge 
                            level={
                            task.priority === "high" ? `error` : 
                            task.priority === "medium" ? `warning` : 
                            `info`}
                        >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                        <Badge level="none">
                            {task.type}
                        </Badge>
                    </div>
                </div>
                <SubTaskList taskId={task._id}/>
            </article>
        </>
    )
}

export default CardDetailTask