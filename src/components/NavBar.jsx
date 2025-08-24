import { GeneralContext } from "../context/GeneralContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const { logOut } = useContext(GeneralContext);
  return (
    <div className="bg-primary">
      <ul className="nav justify-content-end">
        <li className="nav-item m-3">
          <Link to="/formProducto" className="nav-link text-white">
            Crear producto
          </Link>
        </li>
        <li className="nav-item m-3">
          <Link to="/tasks" className="nav-link text-white">
            Ver productos
          </Link>
        </li>

        <li className="nav-item">
          <button className="btn btn-danger m-3" onClick={logOut}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};
