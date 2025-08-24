import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
export const FormTasks = () => {
  const { addProduct } = useContext(TaskContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    addProduct(data);
    reset();
  };

  return (
    <div className="container container-fluid vh-100 d-flex align-items-center justify-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-md-4 col-lg-4 mx-auto"
      >
        <h1 className="text-center mb-4 display-4 fw-bold text-primary">
          Crear Producto
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
        <button className="btn btn-primary col-12">Crear</button>
      </form>
    </div>
  );
};
