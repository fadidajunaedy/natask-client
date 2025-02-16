import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeToast } from "../../store/toastSlice"
import classNames from "classnames"

const Toast = () => {
    const { type, message, isShow } = useSelector(state => state.toast)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isShow) {
            const timer = setTimeout(() => {
                dispatch(closeToast())
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [isShow, dispatch])

    if (!isShow) return null
    
     const toastClassNames = classNames(
            "fixed z-[99] bottom-4 right-4 flex justify-between items-center rounded-lg p-4 text-base-100 font-semibold",
            {
                "bg-info": type === "INFO",
                "bg-success": type === "SUCCESS",
                "bg-warning": type === "WARNING",
                "bg-error": type === "ERROR"
            }
        )

    return (
        <div className={toastClassNames}>
            <p>{message}</p>
        </div>
    )
}

export default Toast