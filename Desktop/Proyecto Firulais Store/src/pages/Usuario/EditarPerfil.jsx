
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { Navigate, useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth"; 
import styles from "./EditarPerfil.module.css";

function EditarPerfil() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [nuevaPassword, setNuevaPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");

        if (nuevaPassword !== confirmarPassword) {
            return setError("Las contraseñas no coinciden.");
        }

        if (nuevaPassword.length < 8) {
            return setError("La nueva contraseña debe tener al menos 8 caracteres.");
        }

        try {
            await updatePassword(user, nuevaPassword);
            setMensaje("¡Contraseña actualizada con éxito! Redirigiendo...");
            setNuevaPassword("");
            setConfirmarPassword("");

            setTimeout(() => {
                navigate("/perfil");
            }, 2000);
            
        } catch (err) {
            console.error(err);
            if (err.code === "auth/requires-recent-login") {
                setError(
                    "Por seguridad, salí y volvé a ingresar.",
                );
            } else {
                setError(
                    "No se pudo actualizar la contraseña. Intentá de nuevo."
                );
            }
        }
    };

    return (
        <div className={styles.editarContainer}>
            <h2>Editar Perfil</h2>

            <div className={styles.tarjetaEditar}>
                <div className={styles.campoFijo}>
                    <label>Correo Electrónico (No modificable):</label>
                    <input
                        type="text"
                        value={user?.email || ""}
                        disabled
                        className={styles.inputDisabled}
                    />
                </div>

                <hr className={styles.separador} />

                <h3>Cambiar Contraseña</h3>

                {mensaje && <p className={styles.exitoMensaje}>{mensaje}</p>}
                {error && <p className={styles.errorMensaje}>{error}</p>}

                <form onSubmit={handleUpdate} className={styles.formulario}>
                    <div className={styles.grupoInput}>
                        <label>Nueva Contraseña:</label>
                        <input
                            type="password"
                            value={nuevaPassword}
                            onChange={(e) => setNuevaPassword(e.target.value)}
                            required
                            className={styles.inputControl}
                        />
                    </div>

                    <div className={styles.grupoInput}>
                        <label>Confirmar Nueva Contraseña:</label>
                        <input
                            type="password"
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                            required
                            className={styles.inputControl}
                        />
                    </div>

                    <button type="submit" className={styles.botonGuardar}>
                        Actualizar Contraseña
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditarPerfil;