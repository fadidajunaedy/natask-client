import { z } from "zod"
import { useState } from "react"
import FileInput from "../common/FileInput"
import Input from "../common/Input"
import Button from "../common/Button"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../store/modalSlice"
import ImagePreview from "../common/ImagePreview"
import useToast from "../../hooks/useToast"
import eventEmitter from "../../utils/eventEmitter"
import { createEmployee } from "../../services/employeeService"

const employeeSchema = z.object({
    photo: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 1024 * 1024 * 1, {
        message: "File size must be less than 1MB",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
        message: "File must be an image (jpg, jpeg, png, webp)",
    }),
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
})

const FormCreateEmployee = () => {
    const [state, setState] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const showToast = useToast()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setErrors({})
                
        try {
            employeeSchema.parse(state)
            
            const formData = new FormData()
            state.photo && formData.append("photo", state.photo)
            formData.append("name", state.name)
            formData.append("email", state.email)

            const response = await createEmployee(formData)

            if (response.success) {
                eventEmitter.emit("employeeChanged")
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <FileInput 
                    name="photo"
                    label="Photo"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setState((prev) => ({ ...prev, photo: file }))
                    }}
                    error={errors.photo}
                />
                 {state.photo && (
                    <ImagePreview image={state.photo instanceof File ? URL.createObjectURL(state.photo) : `${import.meta.env.VITE_API_URL}/files/employee/photo/${state.photo}`} />
                )}
                <Input
                    name="name"
                    label="Name"
                    value={state.name}
                    onChange={(e) =>
                        setState((prev) => ({ ...prev, name: e.target.value }))
                    }
                    loading={loading}
                    error={errors.name}
                />
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={state.email}
                    onChange={(e) =>
                        setState((prev) => ({ ...prev, email: e.target.value }))
                    }
                    loading={loading}
                    error={errors.email}
                />
                <Button level="primary" type="submit" loading={loading}>Submit</Button>
            </form>
        </>
    )
}

export default FormCreateEmployee