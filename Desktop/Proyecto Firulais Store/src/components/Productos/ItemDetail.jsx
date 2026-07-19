
import Contador from "../comunes/Contador";
import { useCarrito } from "../../context/CarritoContext";
import styles from "./ItemDetail.module.css";
import { useState } from "react";

function ItemDetail({ producto }) {
    const { agregarCarrito, obtenerCantidadProducto } = useCarrito();
    const cantidadEnCarrito = obtenerCantidadProducto(producto.id);
    const yaTieneEseProducto = cantidadEnCarrito > 0;
    const [mostrarAgregado, setMostrarAgregado] = useState(false)
    const onAdd = (cantidadElegida) => {
        agregarCarrito(producto, cantidadElegida, true);
        setMostrarAgregado(true);
        setTimeout(() => setMostrarAgregado(false), 3000);
    };

    return (

        <article className={styles.detalleContainer}>
            <div className={styles.colImagen}>
                <img
                    src={producto.imagen_producto}
                    alt={producto.nombre}
                    className={styles.imagenDetalle}
                />
                <p className={styles.frase}>"{producto.frase_inspiracional}"</p>
            </div>
            <div className={styles.colInfo}>
                <h1 className={styles.titulo}>{producto.nombre}</h1>

                <p className={styles.precio}>
                    $ {producto.precio.toLocaleString("es-AR")} 
                </p>

                {yaTieneEseProducto && (
                    <p className={styles.indicadorCarrito}>
                        ✓ Ya tenés {cantidadEnCarrito} {cantidadEnCarrito === 1 ? 'unidad' : 'unidades'} en el carrito
                    </p>
                )}
                <Contador
                    stock={producto.stock}
                    inicial={cantidadEnCarrito}
                    alAgregar={onAdd}
                    textoTemporal={mostrarAgregado ? "¡Agregado!" : null} 
                />

            </div>
        </article>
    );
}

export default ItemDetail;