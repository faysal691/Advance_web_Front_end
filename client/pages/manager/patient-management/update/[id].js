import { CreateOrUpdateUserForm } from "@/components/CreateOrUpdateUserForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiService } from "@/service";
import UploadImageFile from "@/components/UploadImageFile";

const PatientUpdate = () => {
  const router = useRouter();
  const [data, setData] = useState(null);


  const getPatientDetails = async (id) => {
    try {
      const response = await apiService.get(`manager/patient?id=${id}`);
      console.log("Patient Details", response);

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
      toast.error(error.response.data.message);
      console.error("Error fetching patient details:", error);
    }
  };

  useEffect(() => {
    router.query.id && getPatientDetails(router.query.id);
  }, [router]);

  return (
    <section className="flex flex-col justify-center items-center grow">
      <CreateOrUpdateUserForm
        formTitle={"patient"}
        role={"patient"}
        roleId={5}
        apiData={data}
        isUpdate={true}
      />
      {data != null && (
        <UploadImageFile userId={data.userId} existingImage={data.userAvatar} />
      )}
    </section>
  );
};

export default PatientUpdate;
