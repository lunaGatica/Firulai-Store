
import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css"; 
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioProducto from "../components/productos/FormularioProducto";

function Admin() {
    const [productos, setProductos] = useState([]);
    const [loadingLista, setLoadingLista] = useState(true);
    const [productoEditar, setProductoEditar] = useState(null);
    const obtenerProductos = async () => {
        try {
            setLoadingLista(true);
            const productosRef = collection(db, "productos");
            const snapshot = await getDocs(productosRef);
            const listaMapeada = snapshot.docs.map(doc => ({
                idFirebase: doc.id,
                ...doc.data()
            }));
            
            setProductos(listaMapeada);
        } catch (error) {
            console.error("Error al leer productos:", error);
        } finally {
            setLoadingLista(false);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const manejarEliminar = async (idFirebase, nombreProducto) => {
        const confirmar = window.confirm(`¿Seguro que quieres eliminar "${nombreProducto}" del carrito?`);
        
        if (confirmar) {
            try {
                const docRef = doc(db, "productos", idFirebase);
                await deleteDoc(docRef);
                alert("¡Producto eliminado con éxito!");
                
                obtenerProductos();
                if (productoEditar && productoEditar.idFirebase === idFirebase) {
                    setProductoEditar(null);
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar el producto.");
            }
        }
    };

    return (
        <div className={styles.contenedorAdmin}>
            <header className={styles.cabeceraAdmin}>
                <h1 className={styles.fraseInspiracional}>
                    "Mimando a firulais y felinos, con productos de calidad y amor"
                </h1>
                <p className={styles.subtituloAdmin}>Módulo de Gestión de Trastienda</p>
            </header>

            <section className={styles.seccionFormulario}>
                <h2>{productoEditar ? `Editando: ${productoEditar.nombre}` : "Cargar Nuevo Producto"}</h2>
                <FormularioProducto 
                    productoEditar={productoEditar} 
                    alTerminarGuardar={() => {
                        obtenerProductos(); 
                        setProductoEditar(null);
                    }}
                    cancelarEdicion={() => setProductoEditar(null)}
                />
            </section>

            <section className={styles.seccionTabla}>
                <h2>Inventario de Productos</h2>
                
                {loadingLista ? (
                    <p className={styles.cargando}>Conectando con la base de datos...</p>
                ) : productos.length === 0 ? (
                    <p className={styles.vacio}>No hay productos cargados en el inventario.</p>
                ) : (
                    <div className={styles.contenedorTabla}>
                        <table className={styles.tablaAdmin}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre del Producto</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((prod) => (
                                    <tr key={prod.idFirebase}>
                                        <td>{prod.id}</td>
                                        <td><strong>{prod.nombre}</strong></td>
                                        <td>${prod.precio}</td>
                                        <td>{prod.stock} u.</td>
                                        <td>
                                            <div className={styles.bloqueAcciones}>
                                                <button 
                                                    className={styles.botonEditar}
                                                    onClick={() => setProductoEditar(prod)}
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    className={styles.botonEliminar}
                                                    onClick={() => manejarEliminar(prod.idFirebase, prod.nombre)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Admin;