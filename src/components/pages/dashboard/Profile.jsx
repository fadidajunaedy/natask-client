import { useSelector } from "react-redux";
import useValidImage from "../../../hooks/useValidImage";
import { useState } from "react";
import Input from "../../common/Input";
import Heading from "../../common/Heading";
import Button from "../../common/Button";
import { FiEdit3 } from "react-icons/fi";
import FormChangePassword from "../../forms/FormChangePassword";
import FileInput from "../../common/FileInput";
import ImagePreview from "../../common/ImagePreview";
import FormEditProfile from "../../forms/FormEditProfile";

const Profile = () => {
  const { data } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    name: data.name,
    email: data.email,
    photo: data.photo || null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        <div className="xl:col-span-2 flex flex-col gap-2 bg-base-100 border border-base-200 rounded-xl shadow-lg p-4">
          <FormEditProfile />
        </div>
        <div>
          <div className="bg-base-100 border border-base-200 rounded-xl shadow-lg p-4">
            <Heading level="h2" size="2xl" align="center">
              Change Password
            </Heading>
            <FormChangePassword />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
