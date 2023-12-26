import { CreateOrUpdateUserForm } from "@/components/CreateOrUpdateUserForm"

const CreateDoctor = () => {
	return (
		<section className="flex flex-col justify-center items-center grow my-10">
			<CreateOrUpdateUserForm formTitle={"doctor"} roleId={3} role={"doctor"} />
		</section>
	)
}

export default CreateDoctor
