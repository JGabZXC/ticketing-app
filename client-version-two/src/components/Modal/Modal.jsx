import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
export default function Modal({ isOpen, close, children }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
      __demoMode
    >
      <DialogBackdrop className="fixed inset-0 bg-slate-600/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-slate-500 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
