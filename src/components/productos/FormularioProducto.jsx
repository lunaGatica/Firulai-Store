
import React, { useState, useEffect } from "react";
import styles from "./FormularioProducto.module.css"; 
import { db } from "../../firebase/config";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

function FormularioProducto({ productoEditar, alTerminarGuardar, cancelarEdicion }) {
    const estadoInicialFormulario = {
        id: '',
        nombre: '',
        precio: '',
        stock: '',
    };

    const [datosFormulario, setDatosFormulario] = useState(estadoInicialFormulario);
    const [mostrarExito, setMostrarExito] = useState(false); 
    const [loading, setLoading] = useState(false); 
    const [llaveReset, setLlaveReset] = useState(0); 
    const API_KEY_IMGBB = import.meta.env.VITE_IMGBB_API_KEY;

    useEffect(() => {
        if (productoEditar) {
            setDatosFormulario({
                id: productoEditar.id.toString(),
                nombre: productoEditar.nombre || '',
                precio: productoEditar.precio || '',
                stock: productoEditar.stock || '',
               
            });

            window.scrollTo({ top: 0, behavior: "smooth" });

        } else {
            setDatosFormulario(estadoInicialFormulario);
        }
    }, [productoEditar]);

    const manejarCambio = (evento) => {
        const { name, value, type, files } = evento.target;

        if (type === "file") {
            setDatosFormulario({ ...datosFormulario, [name]: files[0] });
        } else {
            setDatosFormulario({ ...datosFormulario, [name]: value });
        }
    };  

    const manejarEnvio = async (evento) => {
        evento.preventDefault(); 
        setLoading(true);

        try {
            const datosProducto = {
                id: Number(datosFormulario.id),
                nombre: datosFormulario.nombre,
                precio: Number(datosFormulario.precio),
                stock: Number(datosFormulario.stock),
                 
            };

            if (productoEditar) {
                const docRef = doc(db, "productos", productoEditar.idFirebase);
                await updateDoc(docRef, datosProducto);
                console.log("Producto actualizado con éxito");
            } else {
                const productosRef = collection(db, "productos");
                await addDoc(productosRef, datosProducto);
                console.log("Producto guardado con éxito");
            }

            setDatosFormulario(estadoInicialFormulario);
            setLlaveReset(prev => prev + 1);
            setMostrarExito(true);
            setTimeout(() => setMostrarExito(false), 4000);

            if (alTerminarGuardar) alTerminarGuardar();

        } catch (error) {
            console.error("Error al procesar en Firebase:", error);
            alert("Hubo un problema al guardar los cambios.");
        } finally {
            setLoading(false);
        }
    };


    return (

        <form onSubmit={manejarEnvio} className={styles.formularioCarga}>

            <div className={styles.filaDoble}>

                <div className={`${styles.grupoCampo} ${styles.columnaNombre}`}>
                    <label>Nombre del Producto</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={datosFormulario.nombre} 
                        onChange={manejarCambio} 
                        disabled={loading} 
                        placeholder="ej: Accesorios para Mascotas" 
                        required 
                    />
                </div>

                <div className={`${styles.grupoCampo} ${styles.columnaId}`}>
                    <label>ID</label>
                    <input
                        type="text"
                        name="id"
                        value={datosFormulario.id}
                        onChange={manejarCambio}
                        disabled={loading}
                        placeholder="ej: 10"
                        required
                    />
                </div>
            
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
            <div className={styles.contenedorBotones}>

                <button type="submit" className={styles.botonEnviar} disabled={loading}>
                    {loading ? "Procesando..." : productoEditar ? "Guardar Cambios" : "Subir al Inventario"}
                </button>
                
                {productoEditar && (
                    <button 
                        type="button" 
                        className={styles.botonCancelar} 
                        onClick={cancelarEdicion}
                        disabled={loading}
                    >
                        Cancelar Edición
                    </button>
                )}
            </div>

            {mostrarExito && (
                <div className={styles.mensajeExito}>
                    ¡Gracias! El producto ha sido {productoEditar ? "actualizado" : "agregado"} con éxito.
                </div>
            )}
        </form>
    );
}

export default FormularioProducto;