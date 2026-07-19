
import Item from './Item'
import styles from './ItemListContainer.module.css'

function ItemList({ productos }) {
    return (

        <div className={styles.contenedor}>
            {productos.map((Producto) => (
                <Item key={Producto.id} producto={Producto} />
            ))}
        </div>
    );
}

export default ItemList;