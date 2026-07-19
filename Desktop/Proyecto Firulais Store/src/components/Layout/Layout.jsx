
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import styles from './Layout.module.css';


function Layout() {

    return (
        <>
            <div className={styles.contenedorPadre}>
                <Header />
                <main className={styles.contenidoPrincipal}> 

                    <Outlet /> 

                </main>
                <Footer />
            </div>
        </>
    );
    
}

export default Layout;