
import { useState, useEffect } from "react";
import styles from "./Contador.module.css";

function Contador({ stock, inicial, alAgregar, textoTemporal }) {
    const [cantidad, setCantidad] = useState(inicial || 1);
    useEffect(() => {
        setCantidad(inicial > 0 ? inicial : 1);
    }, [inicial]);

    const sumar = () => cantidad < stock && setCantidad(cantidad + 1);
    const restar = () => cantidad > 0 && setCantidad(cantidad - 1);

    const cambioDetectado = cantidad !== inicial;
    const obtenerTextoBoton = () => {
        if (stock === 0) return "Sin stock";

        if (textoTemporal) return textoTemporal;

        if (cantidad === inicial && cantidad > 0) {
            return "En el carrito";
        }
        if (cantidad === 0 && inicial > 0) {
            return "Quitar del carrito";
        }
        if (inicial > 0 && cambioDetectado && cantidad > 0) {
            return `Actualizar cantidad (${cantidad})`;
        }
        
        return "Agregar al carrito";
    };

    const botonDeshabilitado = stock === 0 || 
        (textoTemporal ? false : (!cambioDetectado && inicial > 0)) || 
        (cantidad === 0 && inicial === 0);


    return (
        <div className={styles.contadorContenedor}>
            <div className={styles.controles}>
                <button 
                    onClick={restar} 
                    className={styles.btnControl}
                    disabled={cantidad === 0}
                >
                    -
                </button>
                <span className={styles.numero}>{cantidad}</span>
                <button 
                    onClick={sumar} 
                    className={styles.btnControl}
                    disabled={cantidad >= stock}
                >
                    +
                </button>
            </div>

            <button 
                onClick={() => alAgregar(cantidad)} 
                className={styles.btnAgregar}
                disabled={botonDeshabilitado}
            >
                {obtenerTextoBoton()}
            </button>
        </div>
    );
}

export default Contador;