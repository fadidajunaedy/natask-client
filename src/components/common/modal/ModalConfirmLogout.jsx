import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../../store/modalSlice";
import { deleteDataUser } from "../../../store/authSlice";
import Button from "../Button";
import Heading from "../../common/Heading";
import useToast from "../../../hooks/useToast";

const ModalConfirmLogout = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();

  const handleLogout = async () => {
    setLoading(true);
    try {
      dispatch(deleteDataUser());
      dispatch(closeModal());
      navigate("/auth/login");
      showToast("SUCCESS", "Logout Success");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Heading level="h2" size="2xl" align="center">
          Logout Confirmation
        </Heading>
        <p className="text-center">Are you sure you want to logout?</p>
        <Button
          level="primary"
          onClick={handleLogout}
          className="w-full"
          loading={loading}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export default ModalConfirmLogout;
