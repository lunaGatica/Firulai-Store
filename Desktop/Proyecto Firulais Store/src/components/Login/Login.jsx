
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate, Link } from "react-router-dom"; 
import styles from "./Login.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const { iniciarSesion } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError("");

        try {
            await iniciarSesion(email, password);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(
                "Correo o contraseña incorrectos.",
            );
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Iniciar Sesión</h2>
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
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        className={styles.inputControl}
                    />
                </div>

                <button type="submit" className={styles.botonIngresar}>
                    Ingresar
                </button>
            </form>

            <p className={styles.textoRegistro}>
                ¿No tienes cuenta?{" "}
                <Link to="/registro" className={styles.enlace}>
                    Registrate acá
                </Link>
            </p>
        </div>
    );
}

export default Login;