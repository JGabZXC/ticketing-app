import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
  DialogTitle,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSubmit, Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { useSelector } from "react-redux";
export default function TicketItemContentButtons({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const submit = useSubmit();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function confirmDelete() {
    submit(null, {
      method: "DELETE",
    });
    setIsOpen(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} close={closeModal}>
        <DialogTitle as="h3" className="text-base/7 font-medium text-slate-50">
          Delete Ticket
        </DialogTitle>
        <p className="mt-2 text-sm/6 text-slate-100">
          Are you sure you want to delete this ticket? This action can not be
          undone.
        </p>
        <div className="flex gap-4 mt-4">
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-slate-50 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-gray-700"
            onClick={confirmDelete}
          >
            Yes
          </Button>
          <Button
            className="inline-flex items-center gap-2 rounded-md  px-4 py-2 text-sm font-semibold text-slate-50 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-slate-200 data-hover:text-slate-500 data-open:bg-gray-700"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <div className="flex justify-between items-center mb-5">
        <Link to=".." className="text-slate-50">
          <button className="rounded-md px-4 py-1 text-sm bg-indigo-600 flex gap-2 items-center hover:bg-indigo-700 transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go Back</span>
          </button>
        </Link>
        {user && userId === user._id ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                Options
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Edit
                  </Link>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <button
                    type="button"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full text-left"
                    onClick={openModal}
                  >
                    Delete
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        ) : undefined}
      </div>
    </>
  );
}
