// https://tailwindui.com/components/application-ui/overlays/slide-overs

import { Fragment, memo } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"

const DrawerPortal = memo(function Component({
	backdrop,
	children,
	closeOnExternalClick = true,
	drawer,
	visibility,
	updateVisibility,
	onClose,
}) {
	const mergedBackdropProps = {
		visibility: true,
		...backdrop,
	}
	const mergedDrawerProps = {
		position: "left",
		...drawer,
	}

	const DrawerContent = () => {
		return (
			<div className="absolute inset-0 z-[5] overflow-hidden">
				<div
					className={cn(
						"pointer-events-none fixed inset-y-0 flex max-w-full",
						mergedDrawerProps.position == "right" && "right-0",
						mergedDrawerProps.position == "left" && "left-0"
					)}
				>
					<Transition.Child
						as={Fragment}
						enter="transform transition ease-in-out duration-500 sm:duration-700"
						leave="transform transition ease-in-out duration-500 sm:duration-700"
						enterFrom={cn(
							mergedDrawerProps.position == "right" && "translate-x-full",
							mergedDrawerProps.position == "left" && "-translate-x-full"
						)}
						leaveTo={cn(
							mergedDrawerProps.position == "right" && "translate-x-full",
							mergedDrawerProps.position == "left" && "-translate-x-full"
						)}
						enterTo={cn(
							mergedDrawerProps.position == "right" && "translate-x-0",
							mergedDrawerProps.position == "left" && "-translate-x-0"
						)}
						leaveFrom={cn(
							mergedDrawerProps.position == "right" && "translate-x-0",
							mergedDrawerProps.position == "left" && "-translate-x-0"
						)}
					>
						<Dialog.Panel className="pointer-events-auto relative w-full">
							<div className="absolute right-0 top-0 rounded-full text-slate-400 transition-colors hover:text-rose-500">
								<button
									className="text-black !flex !aspect-square"
									onClick={e => {
										updateVisibility(false)
										onClose?.(e)
									}}
								>
									<span className="text-3xl text-slate-200 p-2 hover:text-red-500 cursor-pointer">
										&times;
									</span>
								</button>
							</div>
							<div
								draggable={false}
								className={cn(
									"flex h-full min-w-max overflow-y-scroll bg-white shadow-xl",
									mergedDrawerProps.className
								)}
							>
								<div className="w-full pt-12 bg-gray-50 dark:bg-gray-800">{children}</div>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		)
	}

	return (
		<Transition.Root show={visibility} as={Fragment}>
			<Dialog
				as="div"
				className="relative"
				static={visibility}
				onClose={updateVisibility}
				open={closeOnExternalClick}
			>
				{mergedBackdropProps.visibility ? (
					<>
						<div
							className={cn(
								"fixed inset-0 bg-gray-50/20",
								mergedBackdropProps.className
							)}
						>
							<DrawerContent />
						</div>
					</>
				) : (
					<>
						<DrawerContent />
					</>
				)}
			</Dialog>
		</Transition.Root>
	)
})

export { DrawerPortal }
