
import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import styles from "./Carrito.module.css";

function Carrito() {

    const { 
        carrito, 
        eliminarProducto, 
        agregarCarrito, 
        restarProducto, 
        obtenerPrecioTotal, 
        vaciarCarrito 
    } = useCarrito(); 

    if (carrito.length === 0) {
        return (
            <div className={styles.vacioContainer}>
                <h2>Tu carrito está vacío</h2>
                <p>Parece que aún no has seleccionado ningun producto.</p>
                <Link to="/productos" className={styles.btnVolver}>
                    Ver Listado de productos
                </Link>
            </div>
        );
    }

    const manejarFinalizar = () => {
        alert("¡Muchas gracias por tu compra! En breve nos pondremos en contacto para coordinar el envío.");
        vaciarCarrito(); 
    };

    return (
        <div className={styles.carritoPage}>
            <h2>Productos seleccionados</h2>

            <div className={styles.itemsContenedor}>
                {carrito.map(item => (
                    <div key={item.id} className={styles.itemCard}>

                        <img src={item.imagen_producto} alt={item.nombre} />

                        <div className={styles.itemInfo}>
                            <h3>{item.nombre}</h3>
                            <p className={styles.precioUnitario}>Ref: $ {item.precio.toLocaleString("es-AR")} c/u</p>
                        </div>

                        <div className={styles.cantidadControles}>
                            <button onClick={() => {  restarProducto(item.id); }}>-</button>
                            <span>{item.cantidad}</span>
                            <button onClick={() => { agregarCarrito(item, 1) }}>+</button>
                        </div>

                        <p className={styles.subtotal}>
                            $ {(item.precio * item.cantidad).toLocaleString("es-AR")}
                        </p>

                        <button onClick={() => eliminarProducto(item.id)} className={styles.btnEliminar}>
                            ✕
                        </button>

                    </div>
                ))}
            </div>

            <div className={styles.resumen}>

                <h3>Total: $ {obtenerPrecioTotal().toLocaleString("es-AR")}</h3>

                <div className={styles.acciones}>

                    <Link to="/productos" className={styles.btnSeguir}>
                        Seguir Comprando
                    </Link>

                    <button onClick={vaciarCarrito} className={styles.btnVaciar}>
                        Vaciar Carrito
                    </button>

                    <button onClick={manejarFinalizar} className={styles.btnFinalizar}>
                        Finalizar Compra
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Carrito;

