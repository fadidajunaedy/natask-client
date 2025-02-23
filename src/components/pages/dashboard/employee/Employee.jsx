import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { IoFilterSharp } from "react-icons/io5";
import { setTitle } from "../../../../store/titlePageSlice";
import { openModal } from "../../../../store/modalSlice";
import { getAllEmployee } from "../../../../services/employeeService";
import ReactPaginate from "react-paginate";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import CardEmployee from "../../../features/employee/CardEmployee";
import LoadingAnimation from "../../../widget/LoadingAnimation";
import eventEmitter from "../../../../utils/eventEmitter";
import useToast from "../../../../hooks/useToast";
import useDebounce from "../../../../hooks/useDebounce";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

const arraySorts = ["Ascendant", "Descendant", "Newest First", "Oldest First"];

const Employee = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [sortMode, setSortMode] = useState("Ascendant");
  const [pageNumber, setPageNumber] = useState(0);

  const showToast = useToast();
  const dispatch = useDispatch();
  const debounceKeyword = useDebounce(keyword);

  useEffect(() => {
    const controller = new AbortController();
    const handleGetData = async () => {
      setLoading(true);
      try {
        const response = await getAllEmployee(controller.signal);
        if (response.status === 200) setData(response.data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(error);
          showToast("ERROR", error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    handleGetData();
    dispatch(setTitle({ title: "Employee" }));
    eventEmitter.on("employeeChanged", handleGetData);

    return () => {
      controller.abort();
      eventEmitter.off("employeeChanged", handleGetData);
    };
  }, []);

  const filteredData = useMemo(() => {
    let result = data;

    if (debounceKeyword.trim() !== "") {
      result = result.filter(
        (employee) =>
          employee.name.toLowerCase().includes(debounceKeyword.toLowerCase()) ||
          employee.email.toLowerCase().includes(debounceKeyword.toLowerCase())
      );
    }

    switch (sortMode) {
      case "Descendant":
        result = result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Newest First":
        result = result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "Oldest First":
        result = result.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      default:
        result = result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [data, debounceKeyword, sortMode]);

  const itemsPerPage = 12;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        <div className="col-span-1 md:col-span-2 w-full flex items-center gap-2">
          <div className="dropdown dropdown-start">
            <Button level="primary" square>
              <IoFilterSharp />
            </Button>
            <div
              tabIndex={0}
              className="dropdown-content menu w-52 bg-base-100 border border-base-200 rounded-xl shadow-lg mt-4 p-2 gap-2"
            >
              {arraySorts.map((sort, index) => (
                <Button
                  size="sm"
                  key={index}
                  level={sortMode === sort ? `primary` : `none`}
                  onClick={() => setSortMode(sort)}
                  className="border-2 border-base-200"
                >
                  {sort}
                </Button>
              ))}
            </div>
          </div>
          <Input
            type="search"
            name="search"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="md:col-start-3 xl:col-start-4 w-full flex justify-end items-center gap-4">
          <Button
            level="primary"
            onClick={() =>
              dispatch(openModal({ key: "EMPLOYEE", type: "CREATE" }))
            }
            className="grow"
          >
            + Create Employee
          </Button>
        </div>
      </div>
      {filteredData.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={<HiMiniChevronLeft size={12} />}
          nextLabel={<HiMiniChevronRight size={12} />}
          pageCount={pageCount}
          onPageChange={({ selected }) => setPageNumber(selected)}
          containerClassName={
            "pagination flex justify-end items-center gap-4 mb-4"
          }
          activeClassName={"text-primary font-bold"}
        />
      )}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-4 flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : filteredData.length > 0 ? (
          filteredData
            .slice(pagesVisited, pagesVisited + itemsPerPage)
            .map((employee) => (
              <CardEmployee key={employee._Id} employee={employee} />
            ))
        ) : (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-4 text-center text-slate-400 italic py-8">
            Employee not found
          </div>
        )}
      </section>
    </>
  );
};

export default Employee;
