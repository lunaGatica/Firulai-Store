
import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../../../context/CarritoContext";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
    const { obtenerCantidadTotal } = useCarrito();
    const { user, userRol, cerrarSesion } = useAuth();
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const handleLogout = async () => {
        try {
            setMenuAbierto(false); 
            await cerrarSesion();
            navigate("/"); 
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const nombreUsuario = user ? user.email.split("@")[0] : "";

    return (
        <nav className={styles.navContenedor}>
            <ul className={styles.listaNavegacion}>
                <li>
                    <Link to="/">Inicio</Link>
                </li>

                <li>
                    <Link to="/productos">Productos</Link>
                </li>

                <li>
                    <Link to="/nosotros">Nosotros</Link>
                </li>

                <li>
                    <Link to="/carrito">
                        🛒 Carrito
                        {obtenerCantidadTotal() > 0 && (
                            <span>({obtenerCantidadTotal()})</span>
                        )}
                    </Link>
                </li>


                {user && userRol === "admin" && (
                    <>
                        <li>
                            <Link to="/admin">Administración</Link>
                        </li>
                        <li>
                            <Link to="/admin/cupones"> Cupones</Link>
                        </li>
                    </>
                )}

                {user ? (
                    <li className={styles.contenedorDropdown}>
                        <button 
                            className={styles.botonUsuario} 
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        >
                            <span className={styles.nombreTexto}>{nombreUsuario}</span>
                            <div className={styles.avatarChiquito}>
                                {nombreUsuario.charAt(0).toUpperCase()}
                            </div>
                            <span className={`${styles.flecha} ${menuAbierto ? styles.flechaRotada : ""}`}>▼</span>
                        </button>
                        {menuAbierto && (
                            <ul className={styles.menuDesplegable}>
                                <li>
                                    <Link to="/perfil" onClick={() => setMenuAbierto(false)}>
                                        👤 Mi Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/perfil/editar" onClick={() => setMenuAbierto(false)}>
                                        ⚙️ Editar Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/perfil/favoritos" onClick={() => setMenuAbierto(false)}>
                                        ❤️ Favoritos
                                    </Link>
                                </li>
                                <li className={styles.separadorMenu}>
                                    <button onClick={handleLogout} className={styles.botonSubLogout}>
                                        🚪 Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                ) : (
                    <li>
                        <Link to="/login" className={styles.enlaceLogin}>
                            Ingresar 🔑
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;