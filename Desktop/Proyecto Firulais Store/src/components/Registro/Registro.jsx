
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate, Link } from "react-router-dom";
import styles from "./Registro.module.css";

function Registro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [error, setError] = useState("");
    const { registrarUsuario } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            return setError(
                "Las contraseñas no coinciden.",
            );
        }
        if (password.length < 8) {
            return setError("La contraseña debe tener al menos 8 caracteres.");
        }

        try {
            await registrarUsuario(email, password);
            navigate("/");
        } catch (err) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                setError(
                    "Este correo electrónico ya está registrado.",
                );
            } else {
                setError(
                    "Ocurrió un error al registrar la cuenta. Intentá de nuevo.",
                );
            }
        }
    };

    return (
        <div className={styles.registroContainer}>
            <h2>Crear Cuenta</h2>
            {error && <p className={styles.errorMensaje}>{error}</p>}

            <form onSubmit={handleSubmit} className={styles.formulario}>
                <div className={styles.grupoInput}>
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.inputControl}
                    />
                </div>

                <div className={styles.grupoInput}>
                    <label>Contraseña (mínimo 8 caracteres):</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.inputControl}
                    />
                </div>

                <div className={styles.grupoInput}>
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={styles.inputControl}
                    />
                </div>

                <button type="submit" className={styles.botonRegistrar}>
                    Crear Cuenta
                </button>
            </form>

            <p className={styles.textoLogin}>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className={styles.enlace}>
                    Inicia sesión acá
                </Link>
            </p>
        </div>
    );
}

export default Registro;