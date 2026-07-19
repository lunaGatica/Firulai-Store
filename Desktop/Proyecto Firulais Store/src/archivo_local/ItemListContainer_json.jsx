
import { useState, useEffect } from "react";
import ItemList from './ItemList';
import styles from './ItemListContainer.module.css'


function ItemListContainer({ mensaje, soloDestacados = false }) {
    
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        fetch('/data/productos.json')
            .then((respuesta) => respuesta.json())
            .then((datos) => {

                if (soloDestacados) {
                    setProductos(datos.slice(0, 6));
                } else {
                setProductos(datos);
                }
                
            })

            .catch((error) => console.error("Error cargando productos:", error))
            .finally(() => setCargando(false));

    }, [soloDestacados]); 

    return (

        <section className={styles.seccion}>
            <h2 className={styles.titulo}>{mensaje}</h2>

            {cargando
                ? <p className={styles.mensajeCargando}>Cargando productos...</p>
                : <ItemList productos={productos} />
            }

        </section>
    );

}

export default ItemListContainer;