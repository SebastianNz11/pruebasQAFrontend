import { useForm } from "react-hook-form";
import { useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useLocation, useNavigate } from "react-router-dom";

export const FormUpdateProducts = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { updateProduct } = useContext(TaskContext);
  const navigate = useNavigate();

  const location = useLocation();

  if (!location.state) {
    navigate("/tasks");
    return null;
  }

  const { id, name, description } = location.state;

  const onSubmit = (data) => {
    console.log(data);
    updateProduct(id, data);
    reset();
    navigate("/tasks");
  };

  useEffect(() => {
    setValue("name", name);
    setValue("description", description);
  },);

  return (
    <div className="container container-fluid vh-100 d-flex align-items-center justify-content-center">
      <form
        className="col-md-4 col-lg-4 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center mb-4 display-4 fw-bold text-primary">
          Actualizar Producto
        </h1>
        <input
          type="text"
          placeholder="Nombre del producto"
          className="form-control mb-3"
          {...register("name", {
            required: {
              value: true,
              message: "El nombre es obligatorio",
            },
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 20,
              message: "El nombre debe tener como máximo 20 caracteres",
            },
          })}
        />
        {errors.name && (
          <span className="text-danger">{errors.name.message}</span>
        )}
        <input
          type="text"
          placeholder="Descripción del producto"
          className="form-control mb-3"
          {...register("description", {
            required: {
              value: true,
              message: "La descripción es obligatoria",
            },
            minLength: {
              value: 3,
              message: "La descripción debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 50,
              message: "La descripción debe tener como máximo 50 caracteres",
            },
          })}
        />
        {errors.description && (
          <span className="text-danger">{errors.description.message}</span>
        )}
        <button className="btn btn-warning col-12">Actualizar producto</button>
      </form>
    </div>
  );
};
