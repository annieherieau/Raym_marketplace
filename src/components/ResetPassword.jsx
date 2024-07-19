import { buildRequestOptions } from "../app/api";
import { checkPasswords, getFormData } from "../app/utils";
import { useSearchParams } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom } from "../app/atoms";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ConnexionCard from "./userConnexion/ConnexionCard";
import SubmitButton from "./userConnexion/SubmitButton";

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
          title: status.code == 200 ? "success" : "Erreur",
          message: status.message,
        });
      }
    } catch (error) {
      setNotice({
        title: "Erreur",
        message: error.message,
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
      <ConnexionCard title="Réinitialisez votre mot de passe">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="required block text-sm mt-9 font-medium leading-6"
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
              className="required block text-sm font-medium leading-6"
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
            <SubmitButton />
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
      </ConnexionCard>
      <div className="mt-10 text-center text-sm text-gray-500">
        <p>Une question ? Appelez-nous</p>
        <p className="font-bold">0 969 323 551</p>
        <p>
          lundi au vendredi : 8h - 20h / samedi : 9h - 19h (hors jours fériés)
        </p>
      </div>
    </div>
  );
}
