import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";

const ProtectedRoute = ({ children }) => {
  const showToast = useToast();

  const { isLogin } = useSelector((state) => state.auth);
  if (!isLogin) {
    showToast("WARNING", "You need to login");
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
