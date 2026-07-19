
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';


function ItemDetailContainer() {
    const [producto, setProducto] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch('/data/productos.json')
            .then(res => res.json())
            .then(data => {
                const encontrado = data.find(item => item.id === parseInt(id));
                setProducto(encontrado);
            })
            .catch(err => console.error("Error cargando detalle:", err));
    }, [id]);

    return (
        <>
            {producto 
            ? (<ItemDetail producto={producto} />) 
            : (<p style={{ textAlign: 'center' }}>Cargando detalles del producto...</p>
            )}
        </>
    );
}

export default ItemDetailContainer;