export default function Button({
  children,
  className,
  disabled,
  defaultButton = false,
  ...props
}) {
  if (defaultButton)
    className =
      "cursor-pointer text-gray-900 hover:text-gray-300 transition-colors duration-300 font-normal";

  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
