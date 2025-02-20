import { Routes, Route } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import Dashboard from "../../pages/dashboard/Dashboard";
import Employee from "../../pages/dashboard/employee/Employee";
import Modal from "../../common/modal/Modal";
import Task from "../../pages/dashboard/task/Task";
import DetailTask from "../../pages/dashboard/task/DetailTask";
import Toast from "../../common/Toast";
import Profile from "../../pages/dashboard/Profile";
import { Helmet } from "react-helmet";

const DashboardLayout = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Natatask</title>
        <meta
          name="description"
          content="Manage and track your team's tasks efficiently on Natatask's dashboard."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Modal />
      <div className="w-full flex flex-row overflow-y-auto">
        <DashboardSidebar />
        <main className="ml-auto w-full lg:w-[calc(100%-20em)] min-h-[100vh] overflow-y-auto flex flex-col">
          <DashboardHeader />
          <div className="min-h-[90vh] overflow-x-hidden overflow-y-auto flex flex-col p-4 mt-[10vh]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/task" element={<Task />} />
              <Route path="/task/:_id" element={<DetailTask />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
