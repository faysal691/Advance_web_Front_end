import { format } from "date-fns"
import { Button } from "./ui/button"
import { isEmpty, set } from "lodash"
import { toast } from "react-toastify"
import { apiService } from "@/service"
import Modal from "./ui/modal"
import { useState } from "react"

const AppointmentTable = ({ data = [], setUpdateAppointmentId }) => {
	const [deleteAppointmentId, setDeleteAppointmentId] = useState(null)

	const deleteAppointment = async appointmentId => {
		try {
			const response = await apiService.delete(
				`appointments/delete/avalable?id=${appointmentId}`
			)

			if (response.status === 201 || response.data.status === 200) {
				toast.success(response.data.message)
				setDeleteAppointmentId(null)
				setTimeout(() => {window.location.reload()}, 1000)
				
			} else {
				toast.error("Error Deleting Appointment")
			}
		} catch (error) {
			console.log("Error Deleting Appointment", error)
			toast.error(error.message)
		}
	}

	return (
		<>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Doctor Name
							</th>
							<th scope="col" className="px-6 py-3">
								Patient Name
							</th>
							<th scope="col" className="px-6 py-3">
								Date
							</th>
							<th scope="col" className="px-6 py-3">
								Time
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					{!isEmpty(data) ? (
						<tbody>
							{data.map(element => (
								<tr
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
									key={element.id}
								>
									<td className="px-6 py-4">
										{element.doctor.userDetails.name}
									</td>
									<td className="px-6 py-4">
										{element.patient.userDetails.name}
									</td>
									<td className="px-6 py-4">
										{format(
											new Date(element.availableAppointment.dateTime),
											"dd MMM yyyy"
										)}
									</td>
									<td className="px-6 py-4">
										{format(
											new Date(element.availableAppointment.dateTime),
											"h:mm a"
										)}
									</td>
									<td className="px-6 py-4 flex gap-2">
										{/* <a
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
											href={`/manager/appointment-management/update/${element.id}`}
										>
											Update
										</a> */}
										<Button
											size="sm"
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
											onClick={() => {
												console.log("delete")

												setUpdateAppointmentId(element.id)
											}}
										>
											Update
										</Button>

										<Button
											size="sm"
											className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
											onClick={() => {
												console.log("delete")

												setDeleteAppointmentId(element.id)
											}}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<td className="px-6 py-4" colSpan="5">
									No data found
								</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>

			{/* // - delete modal */}
			<Modal isOpen={deleteAppointmentId} setIsOpen={setDeleteAppointmentId}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
						<svg
							className="w-8 h-8 text-red-500"
							stroke="currentColor"
							viewBox="0 0 52 52"
						>
							<path
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="3"
								d="M31.674 16.545L20.325 33.455M20.325 16.545l11.349 16.91"
							></path>
							<circle
								cx="26"
								cy="26"
								r="25"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							></circle>
						</svg>
					</div>

					<h2 className="mb-2 text-xl font-bold text-slate-600 dark:text-slate-200">
						Delete Appointment
					</h2>
					<p className="text-center text-slate-600 dark:text-slate-200">
						Are you sure you want to delete this appointment? All of your data
						will be <br />
						permanently removed from our servers forever. This action cannot be
						undone.
					</p>
				</div>

				<div className="flex justify-end mt-6 space-x-4">
					<Button
						size="sm"
						className="bg-gray-100 hover:bg-gray-200 text-gray-900"
						onClick={() => setDeleteAppointmentId(null)}
					>
						Cancel
					</Button>
					<Button
						size="sm"
						className="bg-red-500 hover:bg-red-600 text-white"
						onClick={() => {
							deleteAppointment(deleteAppointmentId)
						}}
					>
						Delete
					</Button>
				</div>
			</Modal>
		</>
	)
}

export default AppointmentTable
