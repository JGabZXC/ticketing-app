import Input from "../ui/input";
import Button from "../ui/button";

export default function CreateTicket({ onCancel, onCreate }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    onCreate(formData); // Pass form data to the parent component
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          labelText="Title"
          type="text"
          id="title"
          name="title"
          placeholder="Enter ticket title"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <Input
          labelText="Description"
          type="text"
          id="description"
          name="description"
          placeholder="Enter ticket description"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="priority" className="text-slate-900 text-sm">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="cursor-pointer py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="cursor-pointer py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
