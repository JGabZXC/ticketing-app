export default function Select({ children, labelText, id, ...props }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="font-semibold text-slate-900 text-sm">
        {labelText}
      </label>
      <select id={id} className="p-2 focus:outline-0" {...props}>
        {children}
      </select>
    </div>
  );
}
