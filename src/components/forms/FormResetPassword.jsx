import { z } from "zod";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordUser } from "../../services/authService";
import Input from "../common/Input";
import Button from "../common/Button";
import useToast from "../../hooks/useToast";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Passwords must have at least 8 characters"),
    newPasswordConfirmation: z
      .string()
      .min(8, "Passwords must have at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    path: ["newPasswordConfirmation"],
    message: "New Password and New Password Confirmation do not match",
  });

const FormResetPassword = () => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const showToast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      resetPasswordSchema.parse(state);
      const response = await resetPasswordUser(token, state);
      if (response.success) {
        showToast("SUCCESS", response.message);
        navigate("/auth/login");
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
        showToast("ERROR", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        label="New Password"
        type="password"
        name="new-password"
        value={state.newPassword}
        onChange={(e) =>
          setState((prev) => ({ ...prev, newPassword: e.target.value }))
        }
        loading={loading}
        disabled={loading}
        error={errors.newPassword}
      />
      <Input
        label="New Password Confirmation"
        type="password"
        name="new-password-confirmation"
        value={state.newPasswordConfirmation}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            newPasswordConfirmation: e.target.value,
          }))
        }
        loading={loading}
        disabled={loading}
        error={errors.newPasswordConfirmation}
      />
      <Button
        type="submit"
        level="primary"
        loading={loading}
        disabled={loading}
      >
        {loading ? "Resetting Password..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default FormResetPassword;
