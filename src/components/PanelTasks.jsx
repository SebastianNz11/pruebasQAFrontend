import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const PanelTasks = () => {
  const { products, productDelete } = useContext(TaskContext);
  return (
    <div className="container mt-5 p-2">
      <div className="row g-3">
        {products.map((products) => (
          <div className="col-4" key={products.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{products.name}</h5>
                <p className="card-text">{products.description}</p>

                <Link
                  to={"/editProducto"}
                  state={{
                    id: products.id,
                    name: products.name,
                    description: products.description,
                  }}
                  className="btn btn-primary mt-4 text-white text-decoration-none"
                >
                  Editar
                </Link>

                <a
                  href="#"
                  className="btn btn-danger mt-4 ms-2"
                  onClick={() => productDelete(products.id)}
                >
                  Eliminar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
