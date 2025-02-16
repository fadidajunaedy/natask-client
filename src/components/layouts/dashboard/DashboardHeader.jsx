import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TbLayoutSidebarRightCollapse } from "react-icons/tb"
import { showSidebar } from "../../../store/sidebarSlice"
import Heading from "../../common/Heading"

const DashboardHeader = () => {
    const [showShadow, setShowShadow] = useState(false)
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.data)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= window.innerHeight * 0.1) {
                setShowShadow(true)
            } else {
                setShowShadow(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={`w-full h-[10vh] fixed top-0 z-[90] bg-base-100 border-b border-base-200 flex justify-between items-center p-4 ${showShadow && "shadow-lg"}`}>
            <div className="flex items-center gap-2">
                <button 
                    type="button" 
                    onClick={() => dispatch(showSidebar({ isShow: true }))}
                    className="cursor-pointer block lg:hidden">
                    <TbLayoutSidebarRightCollapse size={32} />
                </button>
                <Heading level="h2" size="2xl" className="text-secondary">Dashboard</Heading>
            </div>
        </header>
    )
}

export default DashboardHeader