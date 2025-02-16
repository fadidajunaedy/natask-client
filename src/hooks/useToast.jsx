import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { showToast } from "../store/toastSlice"

const useToast = () => {
    const dispatch = useDispatch()

    return useCallback((type, message) => dispatch(showToast({ type, message })), [dispatch])
}


export default useToast