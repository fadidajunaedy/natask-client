import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { showSidebar } from "../../../store/sidebarSlice";

import Avatar from "../../common/Avatar";
import NataskLogo from "../../../assets/images/natask-logo.png";
import dashboardSidebarRoutes from "../../../routes/dashboardSidebarRoutes";
import Heading from "../../common/Heading";

const DashboardSidebar = () => {
  const { isShow } = useSelector((state) => state.sidebar);
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <aside
      className={`fixed lg:absolute z-[91] left-0 ${
        isShow ? "translate-x-[0%]" : "translate-x-[-100%]"
      }  lg:translate-x-[0%] lg:fixed lg:top-0 lg:self-start bg-base-100 color-base-100 w-full lg:w-[18em] h-screen flex flex-col shadow-lg`}
    >
      <div className="w-full h-[10vh] flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <img src={NataskLogo} alt="Natask Logo" className="h-[1.6em]" />
          <Heading level="h1" size="3xl">
            Natask
          </Heading>
        </div>
        <button
          type="button"
          onClick={() => dispatch(showSidebar({ isShow: false }))}
          className="cursor-pointer block lg:hidden"
        >
          <TbLayoutSidebarLeftCollapse size={32} />
        </button>
      </div>

      <nav className="sidebar-links grow flex flex-col gap-4 p-4">
        {dashboardSidebarRoutes.map((route, index) => (
          <NavLink
            key={index}
            to={route.path}
            end={route.path === "/dashboard" && true}
            onClick={() => dispatch(showSidebar({ isShow: false }))}
            className="bg-base-100 flex items-center gap-2 rounded-xl py-[0.8rem] px-4 text-sm hover:bg-secondary hover:text-base-100"
          >
            {route.icon && <route.icon size={18} />}
            {route.name}
          </NavLink>
        ))}
        <NavLink
          to="/dashboard/profile"
          onClick={() => dispatch(showSidebar({ isShow: false }))}
          className="bg-base-100 flex items-center gap-2 rounded-xl shadow-lg shadow-base-200 py-[0.8rem] px-4 border border-base-200 hover:bg-secondary hover:text-base-100 mt-auto"
        >
          {/* <Avatar size="3em" src={data.photo} alt={data.name} /> */}
          <div className="break-words">
            <p className="text-md font-bold line-clamp-1">{data.name}</p>
            <p className="text-sm font-normal line-clamp-1">{data.email}</p>
          </div>
          <IoIosArrowForward className="ml-auto" />
        </NavLink>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
