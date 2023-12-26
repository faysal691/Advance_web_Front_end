import { CreateOrUpdateUserForm } from "@/components/CreateOrUpdateUserForm";
import UploadImageFile from "@/components/UploadImageFile";
import { apiService } from "@/service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManagerProfile = () => {
  const [data, setData] = useState(null);

  const getProfileData = async () => {
    try {
      const response = await apiService.get("manager/profile");

      console.log("Manager Profile Details", response);

      if (response.status == 200) {
        const data = {
          userId: response.data.id,
          userName: response.data.userDetails.name,
          userAddress: response.data.userDetails.address,
          userPhone: response.data.userDetails.phone,
          userAvatar:
            response.data.userDetails.avatar != null
              ? `http://localhost:3000/${response.data.userDetails.avatar}`
              : null,
          email: response.data.email,
          isActive: response.data.is_active,
          appointments: response.data.appointments,
          availableAppointments: response.data.availableAppointments,
          roleId: response.data.role.id,
          roleName: response.data.role.name,
        };

        setData(data);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching manager profile:", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center grow">
      {data && (
        <>
          <CreateOrUpdateUserForm
            formTitle={"manager"}
            role={"manager"}
            roleId={2}
            isUpdate={true}
            apiData={data}
          />
          {data != null && (
            <UploadImageFile
              userId={data.userId}
              existingImage={data.userAvatar}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ManagerProfile;
