import { z } from "zod"
import { useState } from "react"
import { changePasswordUser } from "../../services/authService"
import Input from "../common/Input"
import Button from "../common/Button"
import useToast from "../../hooks/useToast"

const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty(),
    newPassword: z.string().min(8, "New Password must have at least 8 characters"),
    confirmationNewPassword: z.string().min(8, "Confirmation New Password must have at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmationNewPassword, {
    path: ["confirmationNewPassword"],
    message: "Password and confirmation password do not match",
})

const FormChangePassword = () => {
    const [state, setState] = useState({
        currentPassword: "",
        newPassword: "",
        confirmationNewPassword: ""
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const showToast = useToast()

    const handleReset = () => {
        setState({
            currentPassword: "",
            newPassword: "",
            confirmationNewPassword: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setErrors({})
                
        try {
            changePasswordSchema.parse(state)
            const response = await changePasswordUser(state)
            console.log(response)
            if (response.success) {
                handleReset()
                showToast("SUCCESS", response.message)
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
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                <Input
                    label="Current Password"
                    type="password" 
                    name="current-password"
                    value={state.currentPassword}
                    onChange={(e) =>
                        setState((prev) => ({ ...prev, currentPassword: e.target.value }))
                    }
                    loading={loading}
                    error={errors.currentPassword}
                />
                <Input
                    label="New Password"
                    type="password" 
                    name="new-password"
                    value={state.newPassword}
                    onChange={(e) =>
                        setState((prev) => ({ ...prev, newPassword: e.target.value }))
                    }
                    loading={loading}
                    error={errors.newPassword}
                />
                <Input
                    label="Confirmation New Password"
                    type="password" 
                    name="confirmation-new-password"
                    value={state.confirmationNewPassword}
                    onChange={(e) =>
                        setState((prev) => ({ ...prev, confirmationNewPassword: e.target.value }))
                    }
                    loading={loading}
                    error={errors.confirmationNewPassword}
                />
                <Button 
                    level="secondary" 
                    type="reset" 
                    loading={loading} 
                    onClick={handleReset}
                >
                    Reset
                </Button>
                <Button 
                    level="primary" 
                    type="submit" 
                    loading={loading}
                >
                    Submit
                </Button>
            </form>
        </>
    )
}

export default FormChangePassword