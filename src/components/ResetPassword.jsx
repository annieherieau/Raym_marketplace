import { buildRequestOptions } from "../app/api";
import { checkPasswords, getFormData } from "../app/utils";
import { useSearchParams } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom } from "../app/atoms";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [notice, setNotice] = useAtom(noticeAtom);
  const navigate = useNavigate();
  // récupérer le reset_passord_token
  const [searchParams] = useSearchParams();
  const reset_password_token = searchParams.get("reset_password_token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupérer les données du formulaire
    const userData = getFormData(event.target);

    // créer la requête
    const { url, options } = buildRequestOptions("users", "reset_password", {
      body: { password: userData.password },
      token: reset_password_token,
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const { status } = await response.json();
        setNotice({
          type: status.code == 200 ? "success" : "error",
          message: status.message,
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: error.message,
      });
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn || notice.type == "success") {
      navigate("/");
    }
  }, [isLoggedIn, notice]);
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-black rounded-lg bg-beige">
          <div className="bg-black p-4 rounded-t-lg">
            <h2 className="text-center mt-8 mb-4 text-4xl font-bold leading-9 tracking-tight text-palegreen-500">
              Réinitialisez votre mot de passe
            </h2>
          </div>
          <div className="p-4">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mt-9 font-medium leading-6 text-black"
                >
                  Mot de passe
                </label>
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
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Confirmation de mot de passe
                </label>
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

