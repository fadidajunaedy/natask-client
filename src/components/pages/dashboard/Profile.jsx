import { useEffect } from "react";
import Heading from "../../common/Heading";
import FormChangePassword from "../../forms/FormChangePassword";
import { useDispatch } from "react-redux";
import { getUser } from "../../../services/authService";
import FormEditProfile from "../../forms/FormEditProfile";
import { setTitle } from "../../../store/titlePageSlice";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle({ title: "Profile" }));
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        <div className="xl:col-span-2 flex flex-col gap-2 bg-base-100 border border-base-200 rounded-xl shadow-lg p-4">
          <FormEditProfile />
        </div>
        <div>
          <div className="bg-base-100 border border-base-200 rounded-xl shadow-lg p-4">
            <Heading level="h2" size="2xl" className="mb-4">
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
