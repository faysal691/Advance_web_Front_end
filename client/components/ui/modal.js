// components/Modal.js

import { Portal } from "react-portal"

export default function Modal({ children, isOpen, setIsOpen }) {
	return (
		<>
			<Portal>
				{isOpen && (
					<div className="fixed inset-0 flex flex-col bg-black bg-opacity-25 items-center justify-center">
						<div className="bg-white border-gray-700 dark:bg-gray-800 dark:border-slate-700 rounded shadow-lg p-2 min-w-[450px]">
              <div className="flex justify-end">
                <button
                  className="text-black"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-3xl text-slate-600 p-1 hover:text-red-500 cursor-pointer">&times;</span>
                </button>
              </div>
              <div className="text-slate-900 p-2">{children}</div>
            </div>
					</div>
				)}
			</Portal>
		</>
	)
}
