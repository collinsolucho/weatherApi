// import form from "react-router";

export default function Form() {
  return (
    <form action="" onSubmit={onSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Another location"
        name="name"
        className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none"
      />
      <button
        type="submit"
        className="absolute top-8 right-10 text-orange-400 text-xl cursor-pointer"
      >
        🔍
      </button>
    </form>
  );
}
