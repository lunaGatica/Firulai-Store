
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext"
import styles from "./Item.module.css";

function Item({ producto }) {

    const { agregarCarrito, obtenerCantidadProducto } = useCarrito();
    const { user } = useAuth(); 
    const [mostrarAgregado, setMostrarAgregado] = useState (false);
    const [esFavorito, setEsFavorito] = useState(false);
    const [mostrarAvisoLogin, setMostrarAvisoLogin] = useState(false);
    useEffect(() => {
        if (!user) {
            setEsFavorito(false);
        }
    }, [user]); 

    const cantidadEnCarrito = obtenerCantidadProducto(producto.id);
    const yaTieneEseProducto = cantidadEnCarrito > 0;
    const estaSinStock = cantidadEnCarrito >= producto.stock || producto.stock === 0;
    const marcarComoFavorito = () => {
        if (!user) {
            setMostrarAvisoLogin(true); 
            setTimeout(() => setMostrarAvisoLogin(false), 2500); 
            return; 
        }
        setEsFavorito(!esFavorito);
    };


    const manejarClick = () => {
        agregarCarrito(producto, 1);
        setMostrarAgregado(true);
        setTimeout(() => setMostrarAgregado(false), 2000);
    };

    const obtenerTextoBoton = () => {
        if (estaSinStock && !mostrarAgregado) return "Sin Stock";
        if (mostrarAgregado) return "¡Agregado!";
        return "Comprar";
    }

    return (

        <article className={styles.tarjeta}>
            <div className={styles.contenedorImagen}>

                <img 
                    src={producto.imagen_escenario} 
                    alt={` ${producto.nombre} `} 
                    className={styles.imagenObra} />
            
                <button 
                    className={`${styles.botonCorazon} ${esFavorito ? styles.corazonActivo : ""}`}
                    onClick={marcarComoFavorito}
                    title={esFavorito ? "Quitar de favoritos" : "Marcar como favorito"}
                />
                {mostrarAvisoLogin && (
                    <div className={styles.avisoLoginFlotante}>
                        Para guardar favoritos debes registrarte.
                    </div>
                )}
            
            </div>

            <h3 className={styles.nombreProducto}>
                {producto.nombre}
            </h3>

            {/* precio */}
            <p className={styles.precioProducto}>
                $ {producto.precio.toLocaleString("es-AR")} 
            </p>
            {yaTieneEseProducto && (
                <p className={styles.indicadorCarrito}>
                    ✓ Ya tenés {cantidadEnCarrito} {cantidadEnCarrito === 1 ? 'unidad' : 'unidades'} en el carrito
                </p>
            )}

            <div className={styles.contenedorBotones}>
                <Link to={`/producto/${producto.id}`} className={styles.botonDetalles}>
                    Detalles
                </Link>
                <button 
                    className={`${styles.botonComprar} ${estaSinStock ? styles.sinStock : ""}`} 
                    onClick={manejarClick}
                    disabled={estaSinStock || mostrarAgregado}
                >
                    {obtenerTextoBoton()}
                </button>

            </div>

        </article>
    );
}

export default Item;