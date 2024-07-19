import { buildRequestOptions, getTokenFromResponse } from "../app/api";
import { createCookie, getFormData } from "../app/utils";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom, userAtom } from "../app/atoms"; // Ajout de userAtom
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ConnexionCard from "../components/userConnexion/ConnexionCard";
import SubmitButton from "../components/userConnexion/SubmitButton";

export default function Login() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [notice, setNotice] = useAtom(noticeAtom);
  const [, setUser] = useAtom(userAtom); // Ajout de setUser
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  // soumission formulaire + requete
  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupérer les données du formulaire
    const userData = getFormData(event.target);

    // créer la requête
    const { url, options } = buildRequestOptions("users", "sign_in", {
      body: { user: userData },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const { data, status } = await response.json();
        if (status.code === 200) {
          setNotice({ title: "success" });

          // création du cookie
          const cookieData = {
            token: getTokenFromResponse(response),
            email: data.user.email,
            id: data.user.id,
            isAdmin: data.user.admin,
          };
          createCookie(cookieData, userData.remember_me);

          // mise à jour de l'atom utilisateur
          setUser({
            token: cookieData.token,
            email: cookieData.email,
            id: cookieData.id,
            isAdmin: cookieData.isAdmin,
          });
        } else {
          setNotice({
            title: "Erreur",
            message: `${status.code}: ${status.message}`,
          });
        }
      }
    } catch (error) {
      setNotice({ title: "Erreur", message: error.message });
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn || notice.title === "success") {
      navigate(`/${redirect}`);
    }
  }, [isLoggedIn, notice]);

  return (
    <section>
      <ConnexionCard title="Connectez-vous">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="mt-2">
            <label
              htmlFor="email"
              className="required block text-sm mt-9 font-medium leading-6 text-left"
            >
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block text-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="required block text-sm font-medium leading-6 text-left"
              >
                Mot de passe
              </label>
              <div className="text-sm">
                <Link
                  to="/password/forgot"
                  className="font-semibold text-blue-600 hover:text-indigo-500"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block text-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              name="remember_me"
              id="remember_me"
              className="mr-2 focus:ring-0 focus:outline-none"
              style={{ accentColor: "black" }}
            />
            <label
              htmlFor="remember_me"
              className="text-sm font-medium leading-6"
            >
              Se souvenir de moi
            </label>
          </div>
          <div className="mt-2">
            <SubmitButton />
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500 mb-5">
          Nouveau client ?
          <Link
            to="/register"
            className="font-semibold leading-6 text-blue-600 hover:text-indigo-500 ml-1"
          >
            Créer un compte
          </Link>
        </p>
      </ConnexionCard>
      <div className=" text-center text-sm text-gray-500">
        <p>Une question ? Appelez-nous</p>
        <p className="font-bold">0 969 323 551</p>
        <p className="mt-2">
          lundi au vendredi : 8h - 20h / samedi : 9h - 19h (hors jours fériés)
        </p>
      </div>
    </section>
  );
}
