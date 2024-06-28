import { useState } from "react";
import { checkPasswords, getFormData } from "../app/utils";
import { buildRequestOptions } from "../app/api";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import PropTypes from 'prop-types';

export default function UserForm({ user, onUpdate }) {
  const { id, token } = useAtomValue(userAtom);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({ ...user });
  console.log(token);

  const handleChange = (event) => {
    const updatedValues = { ...formValues };
    updatedValues[event.target.name] = event.target.value;
    setFormValues(updatedValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // récupérer les données du formulaire
    const userData = getFormData(event.target);

    // créer la requête
    const { url, options } = buildRequestOptions("users", "update_user", {
      body: { ...userData },
      token: token,
    });

    // Exécuter la requête
    try {
      const response = await fetch(url, options);

      if (response) {
        const responseData = await response.json();
        if (response.status == 200) {
          onUpdate();
          window.location.reload();
        } else {
          console.log(response);
          setError(`Erreur ${response.status}: ${JSON.stringify(responseData.errors)}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" value={id} />
        <div className="form-group">
          <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formValues.first_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formValues.last_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="form-group">
          <label htmlFor="current_password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe actuel</label>
          <input
            type="password"
            required
            name="current_password"
            id="current_password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4 mb-2 text-gray-700"><strong>Changer le mot de passe</strong>
        <br />Laisser vide si vous ne souhaitez pas changer votre mot de passe</div>
        <div className="form-group">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Nouveau Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={checkPasswords}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation" className="block text-gray-700 text-sm font-bold mb-2">Confirmer le Mot de passe</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            onChange={checkPasswords}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enregistrer</button>
      </form>
    </section>
  );
}

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
