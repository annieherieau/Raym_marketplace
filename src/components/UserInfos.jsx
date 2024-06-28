export default function UserInfos({ user }) {
  return (
    <div>
      <h1 className="text-palegreen-500 text-3xl pb-4 pt-4">infos de connexion</h1>
      <p className="text-white">Email: {user.email}</p>
      <p className="text-white">Mot de passe: *********</p>
      <h1 className="text-palegreen-500 text-3xl pb-4 pt-4">infos utilisateurs</h1>
      <p className="text-white">Prénom: {user.first_name}</p>
      <p className="text-white">Nom: {user.last_name}</p>
    </div>
  );
}
