import moment from "moment"
import useValidImage from "../../hooks/useValidImage"
import Avatar from "../common/Avatar"
import TableTemplate from "./TableTemplate"

const TableTask = ({ data }) => {
    const validPhoto = useValidImage(`${import.meta.env.VITE_API_URL}/files/employee/photo/${data}`)

    const columns = [
        {
            width: 120,
            align: 'center',
            render: (rowData) => <Avatar src={`${import.meta.env.VITE_API_URL}/files/employee/photo/${rowData.employee.photo}`} />
        },
        // {
        //     title: 'Assigned to',
        //     sorter: (a, b) => a.employee.name.length - b.employee.name.length,
        //     render: (rowData) => rowData.employee.name
        // },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     sorter: (a, b) => a.description.length - b.description.length,
        // },
        {
            // width: 120,
            align: 'center',
            title: 'Priority',
            dataIndex: 'priority',
            sorter: (a, b) => a.priority.length - b.priority.length,
            render: (priority) => 
            <div className={
                `badge badge-soft 
                ${priority === "low" ? "badge-info" : 
                priority === "medium" ? "badge-warning" : 
                priority === "high" && "badge-error"}`}>
                {priority}
            </div>
        },
        {
            // width: 120,
            align: 'center',
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
            render: (type) => 
            <div className="badge badge-soft badge-primary">
                {type}
            </div>
        },
        // {
        //     title: 'Assigned at',
        //     dataIndex: 'assigned_at',
        //     sorter: (a, b) => a.assigned_at.length - b.assigned_at.length,
        //     render: (assigned_at) => moment(assigned_at).format("dddd, MMM Do, YYYY, HH:mm A")
        // },
        // {
        //     title: 'Deadline',
        //     dataIndex: 'deadline',
        //     sorter: (a, b) => a.deadline.length - b.deadline.length,
        //     render: (deadline) => moment(deadline).format("dddd, MMM Do, YYYY, HH:mm A")
        // }
    ]  

    return (
        <>
            <TableTemplate data={data} columns={columns} />
        </>
    )
}

export default TableTask