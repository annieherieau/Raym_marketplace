export default function CategoryButton({onClick, category}){
  return (<button
      className="text-xs text-white hover:text-gray-300 sm:text-sm"
      onClick={() => onClick(category)}
    >
      {category}
    </button>);
}