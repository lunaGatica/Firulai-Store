
import { useState, useEffect } from 'react';
import styles from './Nosotros.module.css';

function Nosotros() {
    const [equipo, setEquipo] = useState([]);

    useEffect(() => {
        fetch('/data/equipo.json')
            .then(res => res.json())
            .then(data => setEquipo(data.equipo_firulaistore))
            .catch(err => console.error("Error cargando el equipo:", err));
    }, []);

    return (
        <div className={styles.nosotrosContainer}>
            <section className={styles.historia}>
                <h1>Nuestra Historia</h1>
                <p>
                  Firulais Store nació de una necesidad de ofrecer productos de calidad para nuestras mascotas, con un enfoque en el bienestar y la felicidad de nuestros amigos peludos.
                </p>
                <p>
                    Desde nuestros inicios, nos hemos comprometido a brindar un servicio excepcional y productos que nuestros clientes y sus mascotas puedan confiar. Cada artículo en nuestra tienda es seleccionado cuidadosamente para garantizar la satisfacción de nuestros clientes.
                </p>
            </section>

            <hr className={styles.divisor} />

            <section className={styles.equipoSeccion}>
                <h2>El Alma de Firulais Store</h2>
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