import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiService } from "@/service";

export function CreateUserForm({
  formTitle,
  roleId,
  role,
  apiData = null,
  isUpdate = false,
}) {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    role_id: roleId,
    department_id: 0,
  });

  // const departmentList = await apiService.getDepartmentList();
  const [departmentList, setDepartmentList] = useState([]);
  const getDepartmentList = async () => {
    const departmentList = await apiService.get("manager/department");
    setDepartmentList(departmentList);
    console.log("Department List", departmentList);
  };

  useEffect(() => {
    getDepartmentList();
    if (isUpdate && apiData != null) {
      setFormData((prev) => ({
        ...prev,
        id: apiData.userId,
        name: apiData.userName,
        email: apiData.email,
        address: apiData.userAddress,
        role_id: roleId,
        phone: apiData.userPhone,
      }));
    }
  }, [isUpdate, apiData]);

  const createUser = async (data) => {
    delete data.id;
    try {
      const response = await apiService.post(
        `manager/${
          roleId == 3
            ? "doctor"
            : roleId == 4
            ? "nurse"
            : roleId == 5
            ? "patient"
            : "patient"
        }`,
        data
      );
      if (response.status === 201 && response.data.status === 200) {
        toast.success(response.data.message);
        setFormData({
          id: 0,
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          role_id: roleId,
          department_id: 0,
        });
      }
    } catch (error) {
      toast.error("error.response.data.message");
    }
  };

  const updateUser = async (data) => {
    try {
      console.log("role",roleId);
      // get role id from session
      const response = await apiService.put(
        roleId === 2
          ? 'manager'
          : `manager/${roleId === 3 ? 'doctor' : roleId === 4 ? 'nurse' : 'patient'}/profile`,
        data
      );
  
      if (response.status === 201 || response.data.status === 200) {
        toast.success(response.data.message);
      } else {
        // Handle other response statuses or display an error message
        toast.error('Failed to update user profile');
      }
    } catch (error) {
      // Handle errors
      console.error('Error updating user profile:', error);
      toast.error('An error occurred while updating user profile');
    }
  };

  return (
    <div className="max-w-md min-w-[420px] space-y-6">
      <Card className="space-y-2 border-gray-700 dark:bg-gray-800 dark:border-slate-700">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold">
            {!isUpdate ? "Create" : "Update"} {formTitle}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter details to {!isUpdate ? "create" : "update"} {formTitle}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="text-black"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="text-black"
              placeholder="john@example.com"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          {!isUpdate && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                className="text-black"
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              className="text-black"
              placeholder="123 Main St."
              value={formData.address}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, address: e.target.value }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              className="text-black"
              placeholder="123-456-7890"
              type="text"
              value={formData.phone}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, phone: e.target.value }));
              }}
            />
          </div>
          {!isUpdate && (
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <select
                className="w-full h-10 border border-gray-300 rounded-md text-black"
                id="department"
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, role_id: e.target.value }));
                }}
              >
                {departmentList.map((data) => {
                  return <option value={data.id}>{data.name}</option>;
                })}
              </select>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              className="w-full h-10 border border-gray-300 rounded-md text-black"
              id="role"
              disabled={true}
            >
              <option id={roleId}>
                {roleId == 3
                  ? "Doctor"
                  : roleId == 4
                  ? "Nurse"
                  : roleId == 5
                  ? "Patient"
                  : roleId == 2
                  ? "Manager"
                  : ""}
              </option>
            </select>
          </div>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white"
            type="submit"
            onClick={() => {
              if (!isUpdate) {
                createUser(formData);
              } else {
                updateUser(formData);
              }
            }}
          >
            {!isUpdate ? "Create" : "Update"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
