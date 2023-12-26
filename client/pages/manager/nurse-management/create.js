import { CreateOrUpdateUserForm } from "@/components/CreateOrUpdateUserForm"

const CreateNurse = () => {
	return (
		<section className="flex flex-col justify-center items-center grow my-10">
			<CreateOrUpdateUserForm formTitle={"nurse"} roleId={4} role={"nurse"} />
		</section>
	)
}

export default CreateNurse
