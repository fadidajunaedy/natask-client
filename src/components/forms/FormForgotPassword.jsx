import { z } from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { forgotPasswordUser } from "../../services/authService";
import useToast from "../../hooks/useToast";

const forgotPasswordSchema = z.object({
  email: z.string().email().nonempty(),
});

const FormForgotPassword = () => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const showToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      forgotPasswordSchema.parse(state);
      const response = await forgotPasswordUser(state);
      if (response.status === 200) {
        setState({});
        showToast("SUCCESS", response.data.message);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        showToast("ERROR", "Periksa Kembali form anda");
        setErrors(formErrors);
      } else {
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
      <Button type="submit" level="primary" loading={loading}>
        Submit
      </Button>
    </form>
  );
};

export default FormForgotPassword;
