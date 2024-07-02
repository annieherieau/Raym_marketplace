export default function Checkout({action}) {
  if (action == "success") {
    return (
      <section>
        <h1>Paiement réussie</h1>
      </section>
    );
  }
  
  if (action == "cancel") {
    return (
      <section style={{ textAlign: 'center' }}>
        <h1>Paiement annulé</h1>
        <p>Vous ne serez pas prélevé</p>
        <br />
      </section>
    );
  }
}
