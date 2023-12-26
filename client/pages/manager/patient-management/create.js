import { CreateOrUpdateUserForm } from "@/components/CreateOrUpdateUserForm"

const PatientCreate = () => {
	return (
		<section className="flex flex-col justify-center items-center grow my-10">
			<CreateOrUpdateUserForm formTitle={"patient"} roleId={5} role={"patient"} />
		</section>
	)
}

export default PatientCreate
