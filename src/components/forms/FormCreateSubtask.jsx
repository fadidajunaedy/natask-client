import { z } from "zod"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../store/modalSlice"

import Input from "../common/Input"
import Button from "../common/Button"
import useToast from "../../hooks/useToast"
import { createSubtask } from "../../services/subtaskService"
import eventEmitter from "../../utils/eventEmitter"

const subTaskSchema = z.object({
    taskId: z.string().nonempty(),
    title: z.string().nonempty(),
})

const FormCreateSubtask = () => {
    const [state, setState] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const showToast = useToast()
    const dispatch = useDispatch()
    const { _id } = useSelector((state) => state.modal)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setErrors({})
                
        try {
            state.taskId = _id
            subTaskSchema.parse(state)

            const response = await createSubtask(state)
            if (response.success) {
                eventEmitter.emit("subtaskChanged")
                showToast("SUCCESS", response.message)
                dispatch(closeModal())
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formErrors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message
                    return acc
                }, {})
                setErrors(formErrors)
            } else {
                console.log(error)
                showToast("ERROR", error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    name="title"
                    label="Title"
                    value={state.title}
                    onChange={(e) =>
                        setState((prev) => ({ ...prev, title: e.target.value }))
                    }
                    loading={loading}
                    error={errors.title}
                />
                <Button level="primary" type="submit" loading={loading}>Submit</Button>
            </form>
        </>
    )
}

export default FormCreateSubtask