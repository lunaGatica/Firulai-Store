
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Nosotros from "./pages/Nosotros";
import Detalle from "./pages/Detalle";
import Login from "./components/login/Login";
import Registro from "./components/registro/Registro";
import Perfil from "./pages/Usuario/Perfil";
import EditarPerfil from "./pages/Usuario/EditarPerfil";
import FavoritosConstruccion from "./pages/Usuario/FavoritosConstruccion";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import Admin from "./pages/Admin";
import GestionCupones from "./components/cupones/GestionCupones";


function App() {
   
    return (
        
        <Routes>

            <Route path="/" element={<Layout />}>

                <Route index element={<Home />} />

                <Route path="productos" element={<Productos />} />
                <Route path="producto/:id" element={<Detalle />} />
                <Route path="nosotros" element={<Nosotros />} />
                <Route path="carrito" element={<Carrito />} />
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Registro />} />

                <Route 
                    path="perfil"
                    element={
                        <ProtectedRoute>
                            <Perfil />
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="perfil/editar"
                    element={
                        <ProtectedRoute>
                            <EditarPerfil />
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="perfil/favoritos"
                    element={
                        <ProtectedRoute>
                            <FavoritosConstruccion />
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="admin" 
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="admin/cupones" 
                    element={
                        <ProtectedRoute>
                            <GestionCupones />
                        </ProtectedRoute>
                    } 
                />
                

            </Route> 
        </Routes>  

    );
}
export default App;