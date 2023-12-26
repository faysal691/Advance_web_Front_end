import { CreateOrUpdateUserForm } from "@/components/CreateOrUpdateUserForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiService } from "@/service";
import UploadImageFile from "@/components/UploadImageFile";

const UpdateNurse = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const getNurseDetails = async (id) => {
    try {
      const response = await apiService.get(`manager/nurse?id=${id}`);
      console.log("Nurse Details", response);

      if (response.status == 200) {
        const data = {
          userId: response.data.message.id,
          userName: response.data.message.userDetails.name,
          userAddress: response.data.message.userDetails.address,
          userPhone: response.data.message.userDetails.phone,
          userAvatar:
            response.data.message.userDetails.avatar != null
              ? `http://localhost:3000/${response.data.message.userDetails.avatar}`
              : null,
          email: response.data.message.email,
          isActive: response.data.message.is_active,
          departmentId: response.data.message.department.id,
          departmentName: response.data.message.department.name,
          departmentDescription: response.data.message.department.description,
          services: response.data.message.services,
          appointments: response.data.message.appointments,
          availableAppointments: response.data.message.availableAppointments,
          roleId: response.data.message.role.id,
          roleName: response.data.message.role.name,
        };

        setData(data);
      }
    } catch (error) {
      // toast.error(error.response.data.message)
      console.error("Error fetching nurse details:", error);
    }
  };

  useEffect(() => {
    router.query.id && getNurseDetails(router.query.id);
  }, [router]);

  return (
    <section className="flex flex-col justify-center items-center grow">
      <CreateOrUpdateUserForm
        formTitle={"nurse"}
        role={"nurse"}
        roleId={4}
        apiData={data}
        isUpdate={true}
      />
      {data != null && (
        <UploadImageFile userId={data.userId} existingImage={data.userAvatar} />
      )}
    </section>
  );
};

export default UpdateNurse;
