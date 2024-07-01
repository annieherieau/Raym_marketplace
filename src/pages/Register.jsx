import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom } from "../app/atoms";
import { buildRequestOptions, getTokenFromResponse } from "../app/api";
import { checkPasswords, createCookie, getFormData } from "../app/utils";
import { useEffect } from "react";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

export default function Register() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [notice, setNotice] = useAtom(noticeAtom);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupérer les données du formulaire
    const userData = getFormData(event.target);

    // créer la requête
    const { url, options } = buildRequestOptions("users", "sign_up", {
      body: { user: userData },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const responseData = await response.json();
        if (response.status == 201) {
          setNotice({ title: "success" });

          // creéation du cookie
          const cookieData = {
            token: getTokenFromResponse(response),
            email: responseData.email,
            id: responseData.id,
            isAdmin: responseData.admin
          };
          createCookie(cookieData, userData.remember_me);

          // Redirection et rafraîchissement de la page
          navigate("/");
          window.location.reload();
        } else {
          setNotice({
            title: "Erreur",
            message: `${response.status}: ${JSON.stringify(
              responseData.errors
            )}`,
          });
        }
      }
    } catch (error) {
      setNotice({ title: "Erreur", message: error.message });
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn || notice.title == "success") {
      navigate("/");
      window.location.reload();
    }
  }, [isLoggedIn, notice, navigate]);

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-black rounded-lg bg-beige">
          <div className="bg-black p-4 rounded-t-lg">
            <h2 className="text-center mt-8 mb-4 text-4xl font-bold leading-9 tracking-tight text-palegreen-500">
              Enregistrez-vous
            </h2>
          </div>
          <div className="p-4">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mt-9 font-medium leading-6 text-black"
                >
                  Adresse email
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Mot de passe
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={checkPasswords}
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Confirmez le mot de passe
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={checkPasswords}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember_me"
                  id="remember_me"
                  className="mr-2 focus:ring-0 focus:outline-none"
                />
                <label htmlFor="remember_me" className="text-sm font-medium leading-6 text-black">
                  Se souvenir de moi
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center mt-9 rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-palegreen-500 shadow-sm hover:bg-palegreen hover:text-palegreen-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Valider
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Déjà client ?
              <Link to="/login" className="font-semibold leading-6 text-blue-600 hover:text-indigo-500 ml-1">
                Connectez-vous ici
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
