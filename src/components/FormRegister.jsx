import { useForm } from "react-hook-form";
import { GeneralContext } from "../context/GeneralContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

export const FormRegister = () => {
  const { registerUser, error, message } = useContext(GeneralContext);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    registerUser(data);
    reset();
  };

  return (
    <div className="container">
      <form
        className="col-md-4 col-lg-4 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center mb-4 display-4 fw-bold text-primary">
          Registrarse
        </h1>
        <input
          type="text"
          placeholder="Nombre"
          className="form-control mb-3"
          {...register("name", {
            required: {
              value: true,
              message: "El nombre es obligatorio",
            },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "El nombre solo puede contener letras y espacios",
            },
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 20,
              message: "El nombre no puede exceder los 50 caracteres",
            },
          })}
        />
        {errors.name && (
          <span className="text-danger">{errors.name.message}</span>
        )}
        <input
          type="email"
          placeholder="Correo"
          className="form-control mb-3"
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
          placeholder="Contraseña"
          className="form-control mb-3"
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
        {message && <span className="text-success">{message}</span>}
        <button className="btn btn-primary col-12 mb-3">Enviar</button>
        <span className="me-5">Ya tienes cuenta</span>
        <Link to="/" className="text-primary col-12">
          Iniciar Sesión
        </Link>
      </form>
    </div>
  );
};
