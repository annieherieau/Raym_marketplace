import { buildRequestOptions } from "../app/api";
import { checkPasswords, getFormData, redirectTo } from "../app/utils";
import { useSearchParams } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom } from "../app/atoms";
import { useEffect } from "react";

export default function ResetPassword() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [notice, setNotice] = useAtom(noticeAtom);
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
      redirectTo("/");
    }
  }, [isLoggedIn, notice]);
  return (
    <section>
      <h1>Changez votre mot de passe</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Nouveau Mot de passe</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            onChange={checkPasswords}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">
            Confirmer le Mot de passe
          </label>
          <input
            type="password"
            required
            name="password_confirmation"
            id="password_confirmation"
            onChange={checkPasswords}
          />
        </div>
        <button type="submit">Enrgistrer</button>
      </form>
    </section>
  );
}
