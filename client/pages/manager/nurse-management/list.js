import { UserListing } from "@/components/UserListing";
import { apiService } from "@/service";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {baseUrl } from "../../../const";


const NurseList = () => {
  const [userList, setUserList] = useState([]);

  const getNurseList = async () => {
    try {
      const response = await apiService.get("manager/nurse/list");
      console.log("Nurse List", response);

      const temp = [];
      if (response.status == 200) {
        response.data.message.forEach((element) => {
          const data = {
            userId: element.id,
            userName: element.userDetails.name,
            userAddress: element.userDetails.address,
            userPhone: element.userDetails.phone,
            userAvatar:
              element.userDetails.avatar != null
                ? baseUrl+element.userDetails.avatar
                : null,
            email: element.email,
            isActive: element.is_active,
            departmentId: element.department.id,
            departmentName: element.department.name,
            departmentDescription: element.department.description,
            services: element.services,
            appointments: element.appointments,
            availableAppointments: element.availableAppointments,
            roleId: element.role.id,
            roleName: element.role.name,
          };
          temp.push(data);
        });
        setUserList(temp);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error fetching nurse list:", error);
    }
  };

  useEffect(() => {
    getNurseList();
  }, []);

  return (
    <section className="flex flex-col grow mt-10 space-y-8">
      <UserListing role={"nurse"} userList={userList} />
    </section>
  );
};

export default NurseList;
