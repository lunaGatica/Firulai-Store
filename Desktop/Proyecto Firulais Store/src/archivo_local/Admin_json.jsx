
import React, { useState } from "react";
import styles from "./Admin.module.css"; 

function Admin() {
    const estadoInicialFormulario = {
        nombre: '',
        precio: '',
        stock: '',
    };

    const [datosFormulario, setDatosFormulario] = useState(estadoInicialFormulario);
    const [mostrarExito, setMostrarExito] = useState(false); 
    const [loading, setLoading] = useState(false); 
    const [llaveReset, setLlaveReset] = useState(0); 
    const API_KEY_IMGBB = import.meta.env.VITE_IMGBB_API_KEY;
    const manejarCambio = (evento) => {
        const { name, value, type, files } = evento.target;
        
        if (type === "file") {
            setDatosFormulario({
                ...datosFormulario,
                [name]: files[0] 
            });
        } else {
            setDatosFormulario({
                ...datosFormulario,
                [name]: value
            });
        }
    };
    };


    return (
        <div className={styles.contenedorAdmin}>

            <header className={styles.cabeceraAdmin}>
                <h1 className={styles.fraseInspiracional}>
                    Cuidando de nuestros amigos peludos, un producto a la vez.
                </h1>
                <p className={styles.subtituloAdmin}>Módulo de Gestión</p>
            </header>

            <form onSubmit={manejarEnvio} className={styles.formularioCarga}>
                <div className={styles.grupoCampo}>
                    <label>Nombre del Producto</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={datosFormulario.nombre} 
                        onChange={manejarCambio} 
                        disabled={loading} 
                        placeholder="ej: Collar Ajustable para Perros"
                        required 
                    />
                </div>

                <div className={styles.filaDoble}>
                    <div className={styles.grupoCampo}>
                        <label>Precio ($)</label>
                        <input 
                            type="number" 
                            name="precio" 
                            value={datosFormulario.precio} 
                            onChange={manejarCambio} 
                            disabled={loading}
                            placeholder="8000"
                            required 
                        />
                    </div>
                    <div className={styles.grupoCampo}>
                        <label>Stock Disponible</label>
                        <input 
                            type="number" 
                            name="stock" 
                            value={datosFormulario.stock} 
                            onChange={manejarCambio} 
                            disabled={loading}
                            placeholder="4"
                            required 
                        />
                    </div>
                </div>

                <div className={styles.grupoCampo}>
                    <label>Imagen Producto {loading && "— Subiendo..."}</label>
                    <input 
                        key={`producto-${llaveReset}`}
                        type="file" 
                        name="imagen_producto" 
                        accept="image/*"
                        onChange={manejarCambio} 
                        disabled={loading}
                        required 
                    />
                </div>

                <button type="submit" className={styles.botonEnviar} disabled={loading}>
                    {loading ? "Procesando Producto..." : "Subir al listado"}
                </button>

                {mostrarExito && (
                    <div className={styles.mensajeExito}>
                        ¡Gracias!
                    </div>
                )}
            </form>
        </div>
    );

export default Admin;