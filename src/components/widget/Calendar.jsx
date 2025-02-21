import moment from "moment";
import { useEffect, useState } from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";
import Button from "../common/Button";
import Avatar from "../common/Avatar";
import { IoArrowDown } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalSlice";
import Heading from "../common/Heading";
const Calendar = ({ data }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    moment().startOf("month")
  );

  const dispatch = useDispatch();

  const allDaysInMonth = () => {
    let start = moment(firstDayOfMonth).startOf("week");
    let end = moment(moment(firstDayOfMonth).endOf("month")).endOf("week");
    var days = [];
    var day = start;
    while (day <= end) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }
    return days;
  };

  // const openAllEventsDetail = (date, theme) => {
  //     if(theme != "MORE")return 1
  //     openDayDetail(moment(date).format("YYYY-MM-DD"))
  // }

  const isToday = (date) => {
    return moment(date).isSame(moment(), "day");
  };

  const isDifferentMonth = (date) => {
    return moment(date).month() != moment(firstDayOfMonth).month();
  };

  const getPrevMonth = () => {
    const firstDayOfPrevMonth = moment(firstDayOfMonth)
      .add(-1, "M")
      .startOf("month");
    setFirstDayOfMonth(firstDayOfPrevMonth);
  };

  const getCurrentMonth = () => {
    const firstDayOfCurrMonth = moment().startOf("month");
    setFirstDayOfMonth(firstDayOfCurrMonth);
  };

  const getNextMonth = () => {
    const firstDayOfNextMonth = moment(firstDayOfMonth)
      .add(1, "M")
      .startOf("month");
    setFirstDayOfMonth(firstDayOfNextMonth);
  };

  const getAllTaskByDate = (date) => {
    return data.filter(
      (task) =>
        moment(date).isSame(moment(task.assignedAt), "day") ||
        moment(date).isSame(moment(task.deadlineAt), "day")
    );
  };

  const getTaskByDate = (date) => {
    let filteredData = data.filter(
      (task) =>
        moment(date).isSame(moment(task.assignedAt), "day") ||
        moment(date).isSame(moment(task.deadlineAt), "day")
    );

    if (filteredData.length > 2) {
      filteredData = filteredData.slice(0, 2);
      filteredData.push({ seeMore: true });
    }

    return filteredData;
  };

  const getAssignedEmployeePhotoByDate = (date) => {
    const uniquePhotos = [];

    let filteredData = data
      .filter(
        (task) =>
          moment(date).isSame(moment(task.assignedAt), "day") ||
          moment(date).isSame(moment(task.deadlineAt), "day")
      )
      .filter((task) => {
        if (
          task.employee.photo &&
          !uniquePhotos.includes(task.employee.photo)
        ) {
          uniquePhotos.push(task.employee.photo);
          return true;
        }
        return false;
      });

    let updatedData = filteredData.map((task) => task.employee.photo);
    if (updatedData.length > 2) {
      updatedData = updatedData.slice(0, 2);
      updatedData.push({ seeMore: true, totalMore: filteredData.length - 2 });
    }

    return updatedData;
  };

  return (
    <>
      <div className="w-full bg-base-100 p-4 rounded-xl">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
          {moment(firstDayOfMonth).month() !== moment().month() ? (
            <Button onClick={getCurrentMonth} level="secondary">
              Go to Current Month
            </Button>
          ) : (
            <Heading
              level="h3"
              size="xl"
              align="center"
              className="text-center md:text-left"
            >
              Calendar
            </Heading>
          )}

          <div className="w-full md:w-auto flex flex-row items-center justify-between gap-2 sm:gap-4 md:mb-0">
            <button
              className="btn btn-square btn-ghost rounded-xl"
              onClick={getPrevMonth}
            >
              <HiMiniChevronLeft className="w-5 h-5" />
            </button>
            <p className="font-semibold w-48 text-center">
              {moment(firstDayOfMonth).format("MMMM yyyy").toString()}
            </p>
            <button
              className="btn btn-square btn-ghost rounded-xl"
              onClick={getNextMonth}
            >
              <HiMiniChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="divider my-2" />
        <div className="grid grid-cols-7 place-items-center">
          {weekdays.map((day, key) => {
            return (
              <div className="text-xs capitalize" key={key}>
                {day}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 mt-1 border-collapse  place-items-center">
          {allDaysInMonth().map((day, idx) => {
            return (
              <div
                key={idx}
                className={
                  colStartClasses[moment(day).day().toString()] +
                  "relative border border-base-200 w-full h-[12rem] lg:h-auto lg:aspect-square flex flex-col gap-1"
                }
              >
                <label
                  className={`group flex items-center justify-center h-8 w-8 text-center hover:bg-base-200 hover:text-neutral rounded-full mx-1 mt-1 text-sm cursor-pointer prose-none ${
                    isToday(day) &&
                    "badge badge-soft badge-primary  text-base-100"
                  } ${isDifferentMonth(day) && "text-slate-400"}`}
                  onClick={() =>
                    dispatch(
                      openModal({
                        key: "TASK",
                        type: "LIST",
                        data: getAllTaskByDate(day),
                      })
                    )
                  }
                >
                  <span
                    className={`${
                      isToday(day) &&
                      "flex items-center justify-center h-8 w-8 text-center rounded-full text-xl hover:bg-base-300 animate-wiggle"
                    }`}
                  >
                    {moment(day).format("D")}
                  </span>
                </label>

                {/* Assigned Task Title */}
                {getTaskByDate(day).map((task, index) => {
                  const isSeeMore = task.seeMore === true;
                  const statusColor = `text-base-100 font-semibold ${
                    task.priority === "high"
                      ? "badge-error"
                      : task.priority === "medium"
                      ? "badge-warning"
                      : "badge-info"
                  }`;
                  const className = `text-xs justify-start truncate cursor-pointer badge badge-xs badge-soft rounded-none w-auto text-left ${
                    isSeeMore
                      ? "badge-primary text-base-100 font-semibold"
                      : statusColor
                  }`;
                  if (isSeeMore) {
                    return (
                      <span
                        key={index}
                        className={className}
                        onClick={() =>
                          dispatch(
                            openModal({
                              key: "TASK",
                              type: "LIST",
                              data: getAllTaskByDate(day),
                            })
                          )
                        }
                      >
                        See More...
                      </span>
                    );
                  } else {
                    return (
                      <>
                        {moment(day).isSame(moment(task.deadlineAt), "day") && (
                          <span className="text-[0.5rem] text-error flex items-center px-2 -mb-1">
                            <IoArrowDown /> Deadline
                          </span>
                        )}
                        <Link
                          key={index}
                          to={`/dashboard/task/${task._id}`}
                          className={className}
                          onClick={() => console.log("test")}
                        >
                          {task.title.length > 20
                            ? task.title.substring(0, 20) + "..."
                            : task.title}
                        </Link>
                      </>
                    );
                  }
                })}

                {/* Assigned Employee Photo */}
                <div className="avatar-group -space-x-4 lg:-space-x-2 mt-auto">
                  {getAssignedEmployeePhotoByDate(day).map((photo, index) => {
                    const isSeeMore = photo?.seeMore === true;

                    if (isSeeMore) {
                      return (
                        <div key={index} className="avatar avatar-placeholder">
                          <div className="w-6 bg-secondary text-base-100 text-xs">
                            {photo?.totalMore}+
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="avatar">
                          <div className="w-6">
                            <img src={photo} />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calendar;
