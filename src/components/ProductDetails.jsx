export default function ProductDetails({product}){
  // console.log(product);
  if(product){
    return(
      <p>{product.name}</p>
    )
  }
 
}