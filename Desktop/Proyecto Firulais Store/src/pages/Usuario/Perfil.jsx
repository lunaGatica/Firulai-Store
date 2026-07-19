
import { useAuth } from "../../context/AuthContext";
import styles from "./Perfil.module.css"; 

function Perfil() {
    const { user, userRol } = useAuth();

    return (
        <div className={styles.perfilContainer}>
            <h2>Mi Perfil</h2>

            {user ? (
                <div className={styles.tarjetaUsuario}>
                    <p>
                        <strong>Id Único (UID):</strong> {user.uid}
                    </p>
                    <p>
                        <strong>Correo Electrónico:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Tipo de Usuario:</strong>{" "}
                        {userRol === "admin"
                            ? "👑 Administrador"
                            : "🛍️ Cliente"}
                    </p>

                    <div className={styles.mensajeBienvenida}>

                        {userRol === "admin" ? (
                            <p>
                                ¡Hola, Admin! Desde aquí podrás gestionar el inventario de productos.
                            </p>
                        ) : (
                            <p>
                                ¡Hola, {user.email.split("@")[0]}! Desde aquí podrás gestionar tus futuras compras.
                            </p>
                        )}
                        
                    </div>
                </div>
            ) : (
                <p>No hay datos de usuario disponibles.</p>
            )}
        </div>
    );
}

export default Perfil;