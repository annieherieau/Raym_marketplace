import { useState } from "react";
import CategoryButton from "./CategoryButton";
import veloIcon from "../../assets/veloIcon.png";
import tshirtIcon from "../../assets/tshirtIcon.png";

export default function Nav(props) {
  const {bikeCategories, clothingCategories, setSelectedBikeCategory, setSelectedClothingCategory} =props
  const [showBikeOptions, setShowBikeOptions] = useState(false);
  const [showClothingOptions, setShowClothingOptions] = useState(false);

   // toggle sur l'icone vélo
   const handleBikeIconClick = () => {
    setShowBikeOptions(!showBikeOptions);
    // setShowClothingOptions(false);
  };

  // toggle sur l'icone vêtements
  const handleClothingIconClick = () => {
    setShowClothingOptions(!showClothingOptions);
    // setShowBikeOptions(false);
  };

  // click sur l'option vélo
  const handleBikeOptionClick = (category) => {
    setSelectedBikeCategory(category);
    // setShowBikeOptions(false);
  };

  // click sur l'option vêtements
  const handleClothingOptionClick = (category) => {
    setSelectedClothingCategory(category);
    // setShowClothingOptions(false);
  };

  return (
    <nav
      className="flex flex-row items-center justify-center h-full space-x-4 text-xs sm:text-sm"
      style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
    >
      <div className="space-y-2 mb-2">
        <div className="flex flex-row space-x-3">
          {showBikeOptions && (
            <div className="flex flex-col items-center space-x-2">
              {bikeCategories.map((category, i) => (
                <CategoryButton
                  key={category + i}
                  onClick={handleBikeOptionClick}
                  category={category}
                />
              ))}
            </div>
          )}
          <a rel="noopener noreferrer" href="#" onClick={handleBikeIconClick}>
            <img
              src={veloIcon}
              alt="Velo Icon"
              className="w-10 h-10 sm:w-16 sm:h-16"
            />
          </a>
        </div>
      </div>
      <div className="space-y-2 mb-2">
        <div className="flex flex-row space-x-3">
          <a
            rel="noopener noreferrer"
            href="#"
            onClick={handleClothingIconClick}
          >
            <img
              src={tshirtIcon}
              alt="T-Shirt Icon"
              className="w-10 h-10 sm:w-14 sm:h-14"
            />
          </a>
          {showClothingOptions && (
            <div className="flex flex-col items-center space-y-2">
              {clothingCategories.map((category, i) => (
                <CategoryButton
                  key={category + i}
                  onClick={handleClothingOptionClick}
                  category={category}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
