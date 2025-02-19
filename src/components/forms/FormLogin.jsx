import { z } from "zod";
import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { useDispatch } from "react-redux";
import { storeDataUser } from "../../store/authSlice";
import { loginUser } from "../../services/authService";

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8, "Passwords must have at least 8 characters"),
});

const FormLogin = () => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const showToast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      loginSchema.parse(state);
      const response = await loginUser(state);
      if (response.status === 200) {
        const user = response.data.data;
        const token = response.data.token;
        dispatch(storeDataUser({ data: user, token: token }));
        showToast("SUCCESS", response.data.message);
        navigate("/dashboard");
      } else {
        console.error(response);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        showToast("ERROR", "Please check your form again");
        setErrors(formErrors);
      } else {
        console.log(error);
        showToast("ERROR", error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={state.email}
        onChange={(e) =>
          setState((prev) => ({ ...prev, email: e.target.value }))
        }
        loading={loading}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="At least 8 characters"
        value={state.password}
        onChange={(e) =>
          setState((prev) => ({ ...prev, password: e.target.value }))
        }
        loading={loading}
        error={errors.password}
      />
      <Link
        to="/auth/forgot-password"
        className="link text-sm text-right text-primary"
      >
        Forgot Password?
      </Link>
      <Button type="submit" level="primary" loading={loading}>
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
