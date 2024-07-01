const Modal = ({ show, onClose, title, children }) => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-lg w-1/2`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <button onClick={onClose} className={`${isDarkMode ? 'text-white' : 'text-black'} text-xl hover:text-palegreen-500`}>
            &times;
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
