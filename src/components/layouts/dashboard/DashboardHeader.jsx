import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { showSidebar } from "../../../store/sidebarSlice";
import { openModal } from "../../../store/modalSlice";
import Heading from "../../common/Heading";
import Button from "../../common/Button";

const DashboardHeader = () => {
  const [showShadow, setShowShadow] = useState(false);
  const { title } = useSelector((state) => state.titlePage);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.1) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-[inherit] h-[12vh] fixed top-0 z-[90] bg-base-100 border-b border-base-200 flex justify-between items-center p-4 ${
        showShadow && "shadow-lg"
      }`}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => dispatch(showSidebar({ isShow: true }))}
          className="cursor-pointer block lg:hidden"
        >
          <TbLayoutSidebarRightCollapse size={32} />
        </button>
        <Heading level="h2" size="2xl" className="text-secondary">
          {title}
        </Heading>
      </div>
      <Button
        outline
        onClick={() => dispatch(openModal({ key: "AUTH", type: "LOGOUT" }))}
        className="hover:bg-secondary active:bg-primary"
      >
        <IoLogOutOutline /> Logout
      </Button>
    </header>
  );
};

export default DashboardHeader;
