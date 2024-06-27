import { buildRequestOptions } from "../app/api";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  onActionComplete,
  cart=true,
}){
  const { token } = useAtomValue(userAtom);

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
        onActionComplete();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChangeQuantity = (newQuantity) => {
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
        onActionComplete();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h3>{item.product.name}</h3>
      <p>{item.id}</p>
      <p>Quantité: {item.quantity}</p>
      {cart && (
        <div>
          <button onClick={() => handleChangeQuantity(item.quantity - 1)}>
            -
          </button>
          <button onClick={() => handleChangeQuantity(item.quantity + 1)}>
            +
          </button>
          <button onClick={handleRemove}>Supprimer</button>
        </div>
      )}
    </div>
  );
};


