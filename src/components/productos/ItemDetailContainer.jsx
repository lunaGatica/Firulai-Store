
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import styles from './ItemDetail.module.css';
import { db } from '../../firebase/config'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

function ItemDetailContainer() {
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true); 
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const obtenerProductoPorId = async () => {
            try {
                setCargando(true); 

                const consultaId = query(
                    collection(db, "productos"),
                    where("id", "==", Number(id))
                );

                const querySnapshot = await getDocs(consultaId); 
                if (!querySnapshot.empty) {
                    const documentoEncontrado = querySnapshot.docs[0].data(); 
                    setProducto(documentoEncontrado);
                } else {
                    console.warn(`No se encontró el producto con ID: ${id}`);
                    setProducto(null);
                }

            } catch (error) {
                console.error("Error cargando el detalle desde Firestore:", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductoPorId();

    }, [id]);

    return (
        <>
            {cargando 
                ? ( <div className={styles.contenedorMensaje}>
                        <p className={styles.mensajeCargando}>Cargando detalles del producto...</p>
                    </div> )
                : producto 
                    ? ( <ItemDetail producto={producto} /> ) 
                    : ( <div className={styles.contenedorMensaje}>
                        <p className={styles.mensajeError}>El producto solicitado no se encuentra disponible.</p>
                    </div> )
            }
        </>
    );
}

export default ItemDetailContainer;