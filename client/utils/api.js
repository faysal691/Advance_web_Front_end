import { apiService } from "@/service";

const serverUrl = String(process.env.NEXT_PUBLIC_SERVER_BASE_URL);

export const userLogin = async (data) => {
  const response = await apiService.post(`auth/login`, data);
};

export const signUp = (data) => {
  return apiService.post(`auth/signup`, data);
};

export const uploadProfilePicture = (data, id) => {
  return apiService.post(`user/upload?id=${id}`, data);
};

export const getUserById = (id) => {
  return apiService.get(`auth/getUserByID?id=${id}`);
};

export const getManagerProfile = () => {
  return apiService.get(`manager/profile`);
};

export const updateManagerProfile = (data) => {
  return apiService.put(`manager`, data);
};

export const createDoctor = (data) => {
  return apiService.post(`manager/doctor`, data);
};

export const getDoctorList = () => {
  return apiService.get(`manager/doctor/list`);
};

export const getDoctorDetails = (id) => {
  return apiService.get(`manager/doctor?id=${id}`);
};

export const updateDoctorProfile = (data) => {
  return apiService.put(`manager/doctor/profile`, data);
};

export const createNurse = (data) => {
  return apiService.post(`manager/nurse`, data);
};

export const getNurseList = () => {
  return apiService.get(`manager/nurse/list`);
};

export const getNurseDetails = (id) => {
  return apiService.get(`manager/nurse?id=${id}`);
};

export const updateNurseProfile = (data) => {
  return apiService.put(`manager/nurse/profile`, data);
};

export const createPatient = (data) => {
  return apiService.post(`manager/patient`, data);
};

export const getPatientList = () => {
  return apiService.get(`manager/patient/list`);
};

export const getPatientDetails = (id) => {
  return apiService.get(`manager/patient?id=${id}`);
};

export const updatePatientProfile = (data) => {
  return apiService.put(`manager/patient/profile`, data);
};

export const createAppointment = (data) => {
  return apiService.post(`appointments/make-appointment`, data);
};

export const assignAvailableAppointmentsToDoctor = (data) => {
  return apiService.post(`appointments/available`, data);
};

export const getAvailableAppointmentListByDoctor = (id) => {
  return apiService.get(`appointments/available?doctorId=${id}`);
};

export const getAllAppointmentList = () => {
  return apiService.get(`appointments/get-all`);
};

export const getAppointmentById = (id) => {
  return apiService.get(`appointments/get-by-id?id=${id}`);
};

export const updateAppointment = (data) => {
  return apiService.put(`appointments/update`, data);
};

export const deleteAppointments = () => {
  return apiService.delete(`appointments`);
};
