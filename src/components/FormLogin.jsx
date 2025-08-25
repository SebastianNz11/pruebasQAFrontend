import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import { TaskContext } from "../context/TaskContext";

export const FormLogin = () => {
  const { login, error } = useContext(GeneralContext);
  const { getProducts } = useContext(TaskContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    console.log(data);
    await login(data);
    getProducts();
    reset();
  };

  return (
    <div className="container">
      <form
        className="col-md-4 col-lg-4 mx-auto"
        onSubmit={handleSubmit(onsubmit)}
      >
        <h1 className="text-center mb-4 display-4 fw-bold text-primary">
          Iniciar Sesión
        </h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Correo"
          {...register("email", {
            required: {
              value: true,
              message: "El correo es obligatorio",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "El correo no es válido",
            },
          })}
        />
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
        <input
          type="password"
          className="form-control mb-3 mt-3"
          placeholder="Contraseña"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es obligatoria",
            },
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
        {error && <span className="text-danger">{error}</span>}
        <button className="btn btn-primary col-12 mt-3 mb-3">Enviar</button>
        <div className="text-center">
          <span className="text-primary me-5">¿No tienes una cuenta?</span>
          <Link to="/register" className="text-primary col-12 text-decoration-none">
            Registrarse
          </Link>
        </div>
      </form>
    </div>
  );
};
