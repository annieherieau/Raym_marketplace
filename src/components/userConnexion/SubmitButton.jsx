export default function SubmitButton({text="Valider", type="submit", onClick=()=>{}}) {
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        isDarkMode ? "text-black bg-palegreen-500 hover:bg-gray-700 hover:text-palegreen-500" : "text-palegreen-500 bg-black hover:bg-palegreen-500 hover:text-black"
      }  border border-black text-xl flex w-full justify-center mt-9 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-palegreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {text}
    </button>
  );
}
