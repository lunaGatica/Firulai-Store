
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import ItemDetailContainer from "../components/productos/ItemDetailContainer"
import styles from "./Detalle.module.css";



function Detalle() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className={styles.detalleMain}>
            <button 
                onClick={() => navigate(-1)} 
                className={styles.botonVolver}
            >
                ← Volver al listado
            </button>

            <ItemDetailContainer />
        </main>
    );
}

export default Detalle;