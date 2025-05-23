export default function Tickets({
  title,
  description,
  image,
  imageAlt,
  reverse,
}) {
  return (
    <div
      className={`mx-auto my-0 mt-[10rem] flex justify-center items-center gap-[5rem] ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div className="max-w-[35rem] text-center lg:text-left">
        <h2 className="text-4xl font-medium text-gray-600">{title}</h2>
        <p className="text-lg text-gray-500 mt-2">{description}</p>
      </div>
      <div className="flex-1 max-w-[350px] hidden lg:block">
        <img src={image} alt={imageAlt} className="rounded-md" />
      </div>
    </div>
  );
}
