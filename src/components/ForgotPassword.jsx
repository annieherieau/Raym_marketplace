import { getFormData } from "../app/utils";
import { buildRequestOptions } from "../app/api";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom } from "../app/atoms";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Formulaire mot de passe oublié
export default function ForgotPassword() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [notice, setNotice] = useAtom(noticeAtom);
  const navigate = useNavigate();

  // soumission formulaire + requete singin
  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupère les données du formulaire
    const userData = getFormData(event.target);
    // créer la requête
    const { url, options } = buildRequestOptions("users", "forgot_password", {
      body: { email: userData.email },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const { status } = await response.json();
        setNotice({
          title: status.code == 200 ? "success" : "Erreur",
          message: status.message,
        });
      }
    } catch (error) {
      setNotice({
        title: "Erreur",
        message: "Une erreur s'est produite, veuillez réessayer.",
      });
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (isLoggedIn || notice.title == "success") {
      navigate("/");
    }
  }, [isLoggedIn, notice]);
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-black rounded-lg bg-beige">
          <div className="bg-black p-4 rounded-t-lg">
            <h2 className="text-center mt-8 mb-4 text-4xl font-bold leading-9 tracking-tight text-palegreen-500">
              Mot de passe oublié
            </h2>
          </div>
          <div className="p-4">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <p className="text-center">Vous recevrez un lien par mail afin de réinitialiser votre mot de passe.</p>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mt-1 font-medium leading-6 text-black"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center mt-9 rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-palegreen hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Valider
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
               Votre mémoire est revenue ? 
              <Link
                to="/"
                className="font-semibold leading-6 text-blue-600 hover:text-indigo-500 ml-1"
              >
                Annuler
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>Une question ? Appelez-nous</p>
          <p className="font-bold">0 969 323 551</p>
          <p>lundi au vendredi : 8h - 20h / samedi : 9h - 19h (hors jours fériés)</p>
        </div>
      </div>
    </div>
  );
}
