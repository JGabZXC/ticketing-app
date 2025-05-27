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
import { useSubmit, Link, useNavigation } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { useSelector } from "react-redux";
export default function TicketItemContentButtons({
  userId,
  assignedAgent,
  setIsEditing,
  isEditing,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function confirmDelete() {
    const formData = new FormData();
    formData.append("type", "delete-ticket");
    await submit(formData, {
      method: "DELETE",
    });
    setIsOpen(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} close={closeModal}>
        <DialogTitle as="h3" className="text-base/7 font-medium text-slate-600">
          Delete Ticket
        </DialogTitle>
        <p className="mt-2 text-sm/6 text-slate-400">
          Are you sure you want to delete this ticket? This action can not be
          undone.
        </p>
        <div className="flex gap-4 mt-4">
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-slate-50 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-gray-700"
            onClick={confirmDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deleting..." : "Yes"}
          </Button>
          <Button
            className="inline-flex items-center gap-2 rounded-md  px-4 py-2 text-sm font-semibold text-slate-400 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-slate-300 data-hover:text-slate-600 data-open:bg-gray-700"
            onClick={closeModal}
            disabled={isSubmitting}
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

        {((user && userId === user?._id) || user?.role === "agent") && (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
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
              {user._id === userId && (
                <>
                  <div className="py-1">
                    <MenuItem>
                      <button
                        className="block px-4 py-2 text-sm text-slate-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full text-left"
                        onClick={() => setIsEditing((prevValue) => !prevValue)}
                      >
                        {isEditing ? "Cancel Edit" : "Edit"}
                      </button>
                    </MenuItem>
                  </div>
                  <div className="py-1">
                    <MenuItem>
                      <button
                        type="button"
                        className="block px-4 py-2 text-sm text-slate-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full text-left"
                        onClick={openModal}
                      >
                        Delete
                      </button>
                    </MenuItem>
                  </div>
                </>
              )}

              {user?.role === "agent" && (
                <AgentAction user={user} assignedAgent={assignedAgent} />
              )}
            </MenuItems>
          </Menu>
        )}
      </div>
    </>
  );
}

function AgentAction({ user, assignedAgent }) {
  const submit = useSubmit();

  function assignToMe(body) {
    const formData = new FormData();
    formData.append("assignedTo", body);
    formData.append("type", "assign-to-me");
    submit(formData, {
      method: "PATCH",
    });
  }

  function markAs(status) {
    const formData = new FormData();
    formData.append("status", status);
    formData.append("type", "mark-as");
    submit(formData, {
      method: "PATCH",
    });
  }

  return (
    <div className="py-1">
      {!assignedAgent ? (
        <MenuItem>
          <button
            type="button"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full text-left"
            onClick={() => assignToMe(user._id)}
          >
            Assign to me
          </button>
        </MenuItem>
      ) : (
        <>
          {assignedAgent._id === user._id ? (
            <>
              <MenuItem>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full text-left"
                  onClick={() => assignToMe(null)}
                >
                  Unassign to me
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full text-left"
                  onClick={() => markAs("open")}
                >
                  Mark as Open
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full text-left"
                  onClick={() => markAs("in-progress")}
                >
                  Mark as In-Progress
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full text-left"
                  onClick={() => markAs("closed")}
                >
                  Mark as Closed
                </button>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <p className="text-xs text-slate-700">Already assigned</p>
            </MenuItem>
          )}
        </>
      )}
    </div>
  );
}
