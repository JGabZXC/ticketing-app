export default function Span({ children, className }) {
  let classes = "p-2 text-sm text-slate-400 rounded-full";
  if (className) classes = className;
  return <span className={classes}>{children}</span>;
}
