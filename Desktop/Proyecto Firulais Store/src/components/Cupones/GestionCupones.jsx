import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import styles from "./GestionCupones.module.css";

function GestionCupones() {
    const [codigo, setCodigo] = useState("");
    const [descuento, setDescuento] = useState("");
    const [loading, setLoading] = useState(false);
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        const cuponesRef = collection(db, "cupones");
        const unsubscribe = onSnapshot(cuponesRef, (snapshot) => {
            const listaCupones = snapshot.docs.map(doc => ({
                idFirebase: doc.id,
                ...doc.data()
            }));
            setCupones(listaCupones);
        }, (error) => {
            console.error("Error al escuchar cupones:", error);
        });

        return () => unsubscribe();
    }, []);

    const manejarCrearCupon = async (e) => {
        e.preventDefault();
        if (!codigo || !descuento) return;

        setLoading(true);
        try {
            const cuponesRef = collection(db, "cupones");
            await addDoc(cuponesRef, {
                codigo: codigo.toUpperCase().trim(),
                descuento: Number(descuento)
            });

            setCodigo("");
            setDescuento("");
            console.log("Cupón creado con éxito");
        } catch (error) {
            console.error("Error al crear el cupón:", error);
            alert("No se pudo crear el cupón");
        } finally {
            setLoading(false);
        }
    };

    const manejarEliminarCupon = async (idFirebase, codigoCupon) => {
        const confirmar = window.confirm(`¿Estás segura de que querés eliminar el cupón "${codigoCupon}"?`);
        if (!confirmar) return;

        try {
            const docRef = doc(db, "cupones", idFirebase);
            await deleteDoc(docRef);
            console.log(`Cupón ${codigoCupon} eliminado`);
        } catch (error) {
            console.error("Error al eliminar el cupón:", error);
            alert("No se pudo eliminar el cupón");
        }
    };

    return (
        <div className={styles.contenedorCupones}>
            <h2>Gestión de Cupones de Descuento</h2>
            <form onSubmit={manejarCrearCupon} className={styles.formularioCupon}>
                <div className={styles.grupoCampo}>
                    <label>Código del Cupón</label>
                    <input 
                        type="text" 
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        placeholder="ej: FIRULAIS15"
                        required
                        disabled={loading}
                    />
                </div>
                <div className={styles.grupoCampo}>
                    <label>Porcentaje de Descuento (%)</label>
                    <input 
                        type="number" 
                        value={descuento}
                        onChange={(e) => setDescuento(e.target.value)}
                        placeholder="ej: 15"
                        min="1"
                        max="100"
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" className={styles.botonCrear} disabled={loading}>
                    {loading ? "Creando..." : "Añadir Cupón"}
                </button>
            </form>

            <div className={styles.seccionLista}>
                <h3>Cupones Activos</h3>
                {cupones.length === 0 ? (
                    <p className={styles.textoVacio}>No hay cupones de descuento creados todavía.</p>
                ) : (
                    <div className={styles.tablaContenedor}>
                        <table className={styles.tablaCupones}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descuento</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cupones.map((cupón) => (
                                    <tr key={cupón.idFirebase}>
                                        <td className={styles.codigoCelda}>{cupón.codigo}</td>
                                        <td>{cupón.descuento}% OFF</td>
                                        <td>
                                            <button 
                                                onClick={() => manejarEliminarCupon(cupón.idFirebase, cupón.codigo)}
                                                className={styles.botonBorrar}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GestionCupones;