import { Field, Input, Description } from "@headlessui/react";
export default function Fields({ label, error, classNameInput, ...props }) {
  let classes =
    "px-3 py-1 rounded-md border-1 h-9 text-sm border-gray-300 w-full";
  if (classNameInput) {
    classes = classNameInput;
  }

  return (
    <Field>
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <Input className={classes} {...props} />
      {error && (
        <Description className="text-sm text-red-300 mt-1">{error}</Description>
      )}
    </Field>
  );
}
