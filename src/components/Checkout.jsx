export default function Checkout({action}) {
  if (action == "success") {
    return (
      <section>
        <h1>PAYMENT OK : SUCCESS</h1>
      </section>
    );
  }
  
  if (action == "cancel") {
    return (
      <section>
        <h1>PAYMENT ERROR</h1>
      </section>
    );
  }
}
