import { useState, useEffect } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { HashLink as Link } from "react-router-hash-link";

export default function CookiesConsent() {
  const [showModal, setShowModal] = useState(false);
  const raymCookieChecker = "raymCookieChecker";

  const handleAccept = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const consentValue = getCookieConsentValue(raymCookieChecker);
    if (consentValue !== "true") {
      setShowModal(true);
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500/60 flex justify-center items-center z-40">
      <CookieConsent
        location="bottom"
        buttonText="ACCEPTER"
        onAccept={handleAccept}
        declineButtonText="REFUSER et quitter"
        cookieName={raymCookieChecker}
        style={{
          background: "#FFFFFF",
          padding: "10px",
        }}
        expires={150}
        // enableDeclineButton
        // onDecline={handleDecline}
        buttonStyle={{
          backgroundColor: "#4A90E2",
          color: "white",
          fontSize: "13px",
          borderRadius: "20px",
          padding: "8px 20px",
        }}
        declineButtonStyle={{
          backgroundColor: "#f44336",
          color: "white",
          fontSize: "13px",
          borderRadius: "20px",
          padding: "8px 20px",
        }}
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Bienvenue sur Raym Marketplace !
        </h3>
        <p className="text-sm text-gray-900">
          En poursuivant votre navigation sur ce site, vous acceptez
          l’utilisation de cookies pour maintenir votre session ouverte.&nbsp;
          <Link
            to="/mentions-legales#cookies"
            className="underline text-blue-500"
          >
            En savoir plus
          </Link>
        </p>
      </CookieConsent>
    </div>
  );
}
