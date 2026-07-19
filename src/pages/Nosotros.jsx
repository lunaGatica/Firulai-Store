import { useState, useEffect } from 'react';
import styles from './Nosotros.module.css';
import { db } from '../firebase/config'; 
import { collection, getDocs } from 'firebase/firestore';

function Nosotros() {
    const [equipo, setEquipo] = useState([]);

    useEffect(() => {
        const equipoRef = collection(db, "equipo");

        getDocs(equipoRef)
            .then((resp) => {
                const dataFirebase = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                setEquipo(dataFirebase);
            })
            .catch(err => console.error("Error cargando el equipo desde Firebase:", err));
    }, []);

    return (
        <div className={styles.nosotrosContainer}>
            <section className={styles.historia}>
                <h1>Nuestro Equipo</h1>
                <p>
                   En firulais.store, creemos que cada mascota merece lo mejor. Por eso, nos dedicamos a ofrecer productos de alta calidad que no solo satisfacen las necesidades de nuestros amigos peludos, sino que también reflejan nuestro compromiso con su bienestar y felicidad.
                </p>
                <p>
            Nuestro equipo está compuesto por amantes de los animales que entienden la importancia de brindarles productos seguros, cómodos y funcionales. Desde juguetes interactivos hasta accesorios de moda, cada artículo en nuestra tienda ha sido cuidadosamente seleccionado para garantizar la satisfacción de nuestros clientes y nuestros compañeros de cuatro patas.
                </p>
            </section>

            <hr className={styles.divisor} />
            <section className={styles.equipoSeccion}>

                <h2>El Equipo</h2>

                <div className={styles.gridEquipo}>

                    {equipo.map((miembro, index) => (
                        <div key={miembro.id} className={`${styles.cardMiembro} ${styles[`foto${index}`]}`}>

                            <div className={styles.contenedorFoto}>
                                <img src={miembro.foto_url} alt={miembro.nombre} />
                            </div>
                            
                            <div className={styles.infoMiembro}>
                                <h3>{miembro.nombre}</h3>
                                <span className={styles.cargo}>{miembro.cargo}</span>
                                <p className={styles.frase}>"{miembro.frase}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Nosotros;