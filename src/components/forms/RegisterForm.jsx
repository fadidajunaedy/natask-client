import { z } from "zod";
import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const registerSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(8, "Passwords must have at least 8 characters"),
    passwordConfirmation: z
      .string()
      .min(8, "Passwords must have at least 8 characters"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Password and confirmation password do not match",
  });

const RegisterForm = ({ onSubmit }) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      registerSchema.parse(state);
      onSubmit(state);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        label="Name"
        name="name"
        placeholder="Enter your name"
        value={state.name}
        onChange={(e) =>
          setState((prev) => ({ ...prev, name: e.target.value }))
        }
        loading={loading}
        error={errors.name}
      />
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
      <Input
        label="Password Confirmation"
        type="password"
        name="password-confirmation"
        placeholder="At least 8 characters"
        value={state.passwordConfirmation}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            passwordConfirmation: e.target.value,
          }))
        }
        loading={loading}
        error={errors.passwordConfirmation}
      />
      <Button type="submit" level="primary" loading={loading}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
