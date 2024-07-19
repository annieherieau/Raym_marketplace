export default function ConnexionCard({children, title, footer}){
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  return(
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div
          className={`${
            isDarkMode
              ? "bg-black text-white border-gray-700"
              : "bg-beige text-black border-black"
          } sm:mx-auto sm:w-full sm:max-w-sm border rounded-lg`}
        >
          <div className={`${
            isDarkMode
              ? "bg-gray-700"
              : "bg-black"
          } bg-black p-4 rounded-t-lg`}>
            <h2 className="text-center mt-8 mb-4 text-4xl font-bold leading-9 tracking-tight text-palegreen-500">
              {title}
            </h2>
          </div>
          <div className="p-6">
          {children}
          </div>
      </div>
    </div>
  )
}