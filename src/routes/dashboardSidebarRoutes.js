import { 
    TbLayoutDashboard,
    TbUsers, 
    TbCircleCheck 
} from "react-icons/tb"

import { BiTask } from "react-icons/bi"
import { GoTasklist } from "react-icons/go"

const dashboardSidebarRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: TbLayoutDashboard
    },
    {
        path: "/dashboard/employee",
        name: "Employee",
        icon: TbUsers
    },
    {
        path: "/dashboard/task",
        name: "Task",
        icon: BiTask
    }
]

export default dashboardSidebarRoutes