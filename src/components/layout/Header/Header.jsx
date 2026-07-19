
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import styles from './Header.module.css'


function Header() {

    return (

        <header className={styles.header}>
            <div className={styles.logoContainer}>

                <Link to='/'>

                    <img 
                        src='/images/marca/nav-marca.png'
                        alt='Logo Firulais Store'
                        className={styles.logo}
                    />

                </Link>
            </div>
            <Navbar />

        </header>
    )
}

export default Header;