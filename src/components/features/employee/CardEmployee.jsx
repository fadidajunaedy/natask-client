import { BsThreeDots } from "react-icons/bs";
import Avatar from "../../common/Avatar";
import Button from "../../common/Button";
import Heading from "../../common/Heading";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

const CardEmployee = ({ employee }) => {
  const dispatch = useDispatch();

  return (
    <>
      <article className="w-full flex items-center gap-4 break-word bg-base-100 rounded-xl p-4">
        <Avatar size="2.8em" src={employee.photo} alt={employee.name} />
        <div>
          <Heading level="h3" size="md">
            {employee.name}
          </Heading>
          <p className="break-all text-sm font-normal opacity-80">
            {employee.email}
          </p>
        </div>
        <div className="dropdown dropdown-left dropdown-end z-[2] ml-auto">
          <Button size="sm" level="none" square>
            <BsThreeDots />
          </Button>
          <div
            tabIndex={0}
            className="dropdown-content flex items-center gap-2 p-2 mr-2 bg-base-100 rounded-xl shadow-lg"
          >
            <Button
              size="sm"
              level="warning"
              square
              onClick={() =>
                dispatch(
                  openModal({ key: "EMPLOYEE", type: "EDIT", data: employee })
                )
              }
            >
              <FiEdit3 />
            </Button>
            <Button
              size="sm"
              level="error"
              square
              onClick={() =>
                dispatch(
                  openModal({
                    key: "EMPLOYEE",
                    type: "DELETE",
                    _id: employee._id,
                  })
                )
              }
            >
              <FiTrash />
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default CardEmployee;
