import { useAtom, useAtomValue } from "jotai";
import { noticeAtom, userAtom } from "../app/atoms";
import { getFormData, redirectTo } from "../app/utils";
import { buildRequestOptions } from "../app/api";
import { useEffect } from "react";

export default function Contact() {
  const [notice, setNotice] = useAtom(noticeAtom);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupérer les données du formulaire
    const visitorData = getFormData(event.target);
    // créer la requête
    const { url, options } = buildRequestOptions("static_pages", "contact", {
      body: { static_pages: visitorData },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const { data, status } = await response.json();
        if (status.code === 200) {
          setNotice({ type: "success", message: status.message });
        } else {
          setNotice({
            type: "error",
            message: `Erreur ${status.code}: ${status.message}`,
          });
        }
      }
    } catch (error) {
      setNotice({ type: "error", message: "Invalid Email or Password" });
      console.log(error.message);
    }

    
  };

  useEffect(()=>{
    if (notice.type == "success") {
      document.forms['contact-form'].reset();
    }
  }, [notice])

  return (
    <section id="contact">
      <h1>Contact</h1>
      <form
        name="contact-form"
        id="contact-form"
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input type="text" required name="name" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
      {/* TODO: rafraichir et effacer le formulare */}
      <p>{notice.message}</p>
    </section>
  );
}
