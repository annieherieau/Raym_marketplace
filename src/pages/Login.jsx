import { buildRequestOptions, getTokenFromResponse } from "../app/api";
import { createCookie, getFormData } from "../app/utils";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom, userAtom } from "../app/atoms"; // Ajout de userAtom
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const isLoggedIn = useAtomValue(isAuthAtom);
    const [notice, setNotice] = useAtom(noticeAtom);
    const [, setUser] = useAtom(userAtom); // Ajout de setUser
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") || '';

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
                    setNotice({ title: "success", message: status.message });

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
            setNotice({ title: "Erreur", message: "Email ou mot de passe incorrect(s)" });
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn || notice.title === 'success') {
            navigate(`/${redirect}`);
        }
    }, [isLoggedIn, notice]);

    return (
        <section>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-black rounded-lg bg-beige">
                    <div className="bg-black p-4 rounded-t-lg">
                        <h2 className="text-center mt-8 mb-4 text-4xl font-bold leading-9 tracking-tight text-palegreen-500">
                            Connectez-vous
                        </h2>
                    </div>
                    <div className="p-4"></div>
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div className="mt-2 mx-4">
                            <label
                                htmlFor="email"
                                className="block text-sm mt-9 font-medium leading-6 text-black text-left"
                            >
                                Adresse email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                            />
                        </div>

                        <div className="mt-2 mx-4">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-black text-left"
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
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-2 mx-4 flex items-center">
                            <input
                                type="checkbox"
                                name="remember_me"
                                id="remember_me"
                                className="mr-2 focus:ring-0 focus:outline-none"
                                style={{ accentColor: 'black' }}
                            />
                            <label htmlFor="remember_me" className="text-sm font-medium leading-6 text-black">
                                Se souvenir de moi
                            </label>
                        </div>
                        <div className="mt-2 mx-4">
                            <button
                                type="submit"
                                className="flex w-full justify-center mt-9 rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-green-400 shadow-sm hover:bg-palegreen hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Valider
                            </button>
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
                </div>
            </div>
            <div className=" text-center text-sm text-gray-500">
                <p>Une question ? Appelez-nous</p>
                <p className="font-bold">0 969 323 551</p>
                <p className="mt-2">lundi au vendredi : 8h - 20h / samedi : 9h - 19h (hors jours fériés)</p>
            </div>
        </section>
    );
}