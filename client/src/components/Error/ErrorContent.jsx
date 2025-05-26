export default function ErrorContent({ title, children }) {
  return (
    <section className="text-center mt-10">
      <h1 className="text-3xl text-slate-700">{title}</h1>
      {children}
    </section>
  );
}
