export default function Input({ labelText, id, error, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-slate-900">
        {labelText}
      </label>
      <input id={id} {...props} />
      {error && <p className="text-red-300 text-sm">{error}</p>}
    </div>
  );
}
