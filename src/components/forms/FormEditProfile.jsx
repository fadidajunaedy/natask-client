import { z } from "zod";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { updateUser } from "../../services/authService";
import Input from "../common/Input";
import FileInput from "../common/FileInput";
import ImagePreview from "../common/ImagePreview";
import Button from "../common/Button";
import useToast from "../../hooks/useToast";
import eventEmitter from "../../utils/eventEmitter";

const profileSchema = z.object({
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
});

const FormEditProfile = () => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const showToast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      profileSchema.parse(state);

      const response = await updateUser(state);

      if (response.success) {
        eventEmitter.emit("employeeChanged");
        showToast("SUCCESS", response.message);
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
        showToast("ERROR", error.message);
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
          label="Name"
          name="name"
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
          Submit
        </Button>
      </form>
    </>
  );
};

export default FormEditProfile;
