import { useAtom, useAtomValue } from "jotai";
// import PropTypes from "prop-types";
import { updateCartAtom, userAtom } from "../../app/atoms";
import { buildRequestOptions } from "../../app/api";

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  // onActionComplete,
  cart = true,
}) {
  const { token } = useAtomValue(userAtom);
  const [, setUpdateCart] = useAtom(updateCartAtom);
  
  const handleRemove = () => {
    const { url, options } = buildRequestOptions("cart_items", "delete", {
      id: item.id,
      token: token,
    });
    console.log(url, options);
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("item not removed");
        }
        onRemove(item.id);
        setUpdateCart(true);
        // onActionComplete();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChangeQuantity = (e) => {
    const newQuantity = e.target.value;
    const { url, options } = buildRequestOptions("cart_items", "update", {
      id: item.id,
      body: { quantity: newQuantity },
      token: token,
    });

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("item not updated");
        }
        onUpdateQuantity(newQuantity);
        setUpdateCart(true);
        // onActionComplete();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.product.photo_url}
          alt={item.product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={`product/${item.product.id}`}>{item.product.name}</a>
            </h3>
            <p className="ml-4">{item.price}&nbsp;€</p>
          </div>
          {/* <p className="mt-1 text-sm text-gray-500">
                                      {item.product.color.name}
                                    </p> */}
        </div>

        {cart && (
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex items-center">
              <span className="mr-2">Qté :</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={handleChangeQuantity}
                className="w-16"
                style={{
                  textAlign: "left",
                  paddingLeft: "0",
                  border: "none",
                  appearance: "textfield",
                  MozAppearance: "textfield",
                  outline: "none",
                  boxShadow: "none",
                  marginTop: "-2px",
                }}
              />
            </div>
            <div className="flex">
              <button
                type="button"
                onClick={handleRemove}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

// CartItem.propTypes = {
//   item: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     product: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string,
//       id: PropTypes.number.isRequired,
//     }).isRequired,
//     quantity: PropTypes.number.isRequired,
//   }).isRequired,
//   onRemove: PropTypes.func,
//   onUpdateQuantity: PropTypes.func,
//   onActionComplete: PropTypes.func,
//   cart: PropTypes.boolean
// };
