
import { useState, useEffect } from "react";
import ItemList from './ItemList';
import styles from './ItemListContainer.module.css';
import { db } from "../../firebase/config"; 
import { collection, getDocs } from "firebase/firestore";

function ItemListContainer({ mensaje, soloDestacados = false }) {
    
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const obtenerProductosFirestore = async () => {
            try {
                const productosRef = collection(db, "productos"); 
                const querySnapshot = await getDocs(productosRef);
                const listaFormateada = querySnapshot.docs.map((doc) => {
                    const datosDelDocumento = doc.data();

                    return {
                        ...datosDelDocumento
                    };
                });
                if (soloDestacados) {
                    setProductos(listaFormateada.slice(0, 6));
                } else {
                    setProductos(listaFormateada);
                }

            } catch (error) {
                console.error("Error al conectar con Firestore:", error);
            } finally {
                setCargando(false);
            }
        };
        obtenerProductosFirestore();

    }, [soloDestacados]);

    return (
        <section className={styles.seccion}>
            <h2 className={styles.titulo}>{mensaje}</h2>
            {cargando
                ? <p className={styles.mensajeCargando}>Cargando Productos...</p>
                : <ItemList productos={productos} />
            }
        </section>
    );
}

export default ItemListContainer;