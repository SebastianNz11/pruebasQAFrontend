import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Tasks } from "./pages/Tasks";
import { UpdateProducts } from "./pages/UpdateProducts";
import { CreateProducts } from "./pages/CreateProducts";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { GeneralProvider } from "./context/GeneralContext";
import { TaskProvider } from "./context/TaskContext";
export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <GeneralProvider>
          <TaskProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<PrivateRoutes />}>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/formProducto" element={<CreateProducts />} />
                <Route path="/editProducto" element={<UpdateProducts />} />
              </Route>
              
            </Routes>
          </TaskProvider>
        </GeneralProvider>
      </BrowserRouter>
    </div>
  );
};
