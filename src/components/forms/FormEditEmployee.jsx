import { z } from "zod";
import { useState } from "react";
import { closeModal } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import FileInput from "../common/FileInput";
import ImagePreview from "../common/ImagePreview";
import Input from "../common/Input";
import Button from "../common/Button";
import useToast from "../../hooks/useToast";
import { updateEmployee } from "../../services/employeeService";
import eventEmitter from "../../utils/eventEmitter";

const employeeSchema = z.object({
  photo: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .refine(
      (photo) => {
        if (!photo || typeof photo === "string") return true;
        return photo.size <= 1024 * 1024 * 1;
      },
      {
        message: "File size must be less than 1MB",
      }
    )
    .refine(
      (photo) => {
        if (!photo || typeof photo === "string") return true;
        return photo.type.startsWith("image/");
      },
      {
        message: "File must be an image (jpg, jpeg, png, webp)",
      }
    ),
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
});

const FormEditEmployee = () => {
  const { data } = useSelector((state) => state.modal);

  const [state, setState] = useState(data);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const showToast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const { _id, _v, createdAt, updatedAt, ...updatedData } = state;
      employeeSchema.parse(updatedData);
      const response = await updateEmployee(_id, updatedData);
      if (response.status === 200) {
        eventEmitter.emit("employeeChanged");
        showToast("SUCCESS", response.data.message);
        dispatch(closeModal());
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
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
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <FileInput
          name="photo"
          label="Photo"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setState((prev) => ({ ...prev, photo: file }));
          }}
          error={errors.photo}
        />
        {state.photo && (
          <ImagePreview
            image={
              state.photo instanceof File
                ? URL.createObjectURL(state.photo)
                : state.photo
            }
          />
        )}
        <Input
          name="name"
          label="Name"
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
          loading={loading}
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          value={state.email}
          onChange={(e) =>
            setState((prev) => ({ ...prev, email: e.target.value }))
          }
          loading={loading}
          error={errors.email}
        />
        <Button level="primary" type="submit" loading={loading}>
          Save Changes
        </Button>
      </form>
    </>
  );
};

export default FormEditEmployee;
