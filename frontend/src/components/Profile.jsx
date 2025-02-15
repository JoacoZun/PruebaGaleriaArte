import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>No has iniciado sesión</p>;

  return (
    <div>
      <h2>Bienvenido, {user.nombre} {user.apellido}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
