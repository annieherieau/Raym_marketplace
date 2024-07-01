import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { noticeAtom } from "../app/atoms";
import { getFormData } from "../app/utils";
import { buildRequestOptions } from "../app/api";
import ReCAPTCHA from "react-google-recaptcha";
import '../../src/index.css'

const RECAPTCHA_KEY =import.meta.env.VITE_RECAPTCHA_KEY;

export default function ContactForm() {
  const [notice, setNotice] = useAtom(noticeAtom);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaValue) {
      setNotice({ title: "Erreur", message: "Veuillez compléter le CAPTCHA", show: true});
      return;
    }

    // récupérer les données du formulaire
    const visitorData = getFormData(event.target);
    // ajouter la valeur reCAPTCHA
    visitorData["g-recaptcha-response"] = captchaValue;

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
          setNotice({ title: "Message envoyé", message: status.message });
        } else {
          setNotice({
            title: "Erreur",
            message: `${status.code}: ${status.message}`,
          });
        }
      }
    } catch (error) {
      setNotice({ type: "Erreur", message: "Une erreur s'est produite" });
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (notice.type === "success") {
      document.forms["contact-form"].reset();
    }
  }, [notice]);

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="map"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d362.10495141630787!2d-2.0788712064804185!3d47.432888213728205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480f80ab03693b43%3A0xeeb6fa7ad9f8d069!2s1%20Rue%20Raymond%20Poulidor%2C%2044160%20Pontch%C3%A2teau!5e0!3m2!1sfr!2sfr!4v1719248737819!5m2!1sfr!2sfr"
          ></iframe>
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                ADRESSE
              </h2>
              <p className="mt-1">
                RAYM, 1 Rue Raymond Poulidor, 44160 Pontchâteau
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-green-500 leading-relaxed">support@raym.com</a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                TELEPHONE
              </h2>
              <p className="leading-relaxed">01 69 31 06 75</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-black flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-green-400 text-3xl mb-1 font-bold title-font" style={{fontFamily: 'Chakra Petch'}}>
            Contactez-nous
          </h2>
          <p className="leading-relaxed mb-5 text-gray-300">
            Nous sommes toujours là pour vous aider ! Si vous avez des questions,
            des suggestions ou besoin d'assistance, n'hésitez pas à nous contacter.
            Notre équipe se fera un plaisir de vous répondre dans les plus brefs
            délais.
          </p>
          <form
            name="contact-form"
            id="contact-form"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-lg bg-gray-800 rounded focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="w-full rounded-lg bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full rounded-lg bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <ReCAPTCHA
              sitekey={RECAPTCHA_KEY}
              onChange={handleCaptchaChange}
            />
            <button
              type="submit"
              className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
