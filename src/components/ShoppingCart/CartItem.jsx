import { useAtom, useAtomValue } from "jotai";
import { updateCartAtom, userAtom } from "../../app/atoms";
import { buildRequestOptions } from "../../app/api";
import { Link } from "react-router-dom";

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  cart = true,
}) {
  const { token } = useAtomValue(userAtom);
  const [, setUpdateCart] = useAtom(updateCartAtom);

  const handleRemove = () => {
    const { url, options } = buildRequestOptions("cart_items", "delete", {
      id: item.id,
      token: token,
    });

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("item not removed");
        }
        onRemove(item.id);
        setUpdateCart(true);
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
              <Link to={`${window.location.origin}/product/${item.product.id}`}>{item.product.name}</Link>
              <p className="mt-1 text-sm text-gray-500">
                {item.product.color.collection}
              </p>
            </h3>
            <p className="ml-4">{item.price}&nbsp;€</p>
          </div>
        </div>
        {!cart &&(<div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center">
            <span className="mr-2">Qté : {item.quantity}</span>
          </div>{" "}
        </div>)}
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
