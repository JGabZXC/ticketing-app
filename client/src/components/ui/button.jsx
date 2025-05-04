export default function Button({
  children,
  className,
  disabled,
  defaultButton = false,
  ...props
}) {
  if (defaultButton)
    className =
      "cursor-pointer hover:text-slate-300 transition-colors duration-300";

  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
