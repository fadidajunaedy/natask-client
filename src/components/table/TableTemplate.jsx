import { Table } from "antd"
import { useState } from "react"

const TableTemplate = ({ data, columns }) => {
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })

    const handleChange = (pagination, filters, sorter) => {
        setPagination(pagination)
    }

    const enhancedColumns = [
        {
          title: 'No',
          width: 50,
          align: 'center',
          render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        ...columns.map(col => ({
            ...col,
            ellipsis: true,
            onCell: () => ({
                style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
            }),
        })),
    ]

    return (
        <>
            <Table
                columns={enhancedColumns}
                dataSource={data}
                scroll={{ x: 'max-content' }}
                onChange={handleChange}
                pagination={pagination}
                className="my-0"/>
        </>
    )
}

export default TableTemplate