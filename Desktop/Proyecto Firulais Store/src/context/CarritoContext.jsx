
import { createContext, useState, useContext } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);
    const agregarCarrito = (item, cantidad, esEdicion = false) => {
        if (cantidad === 0) {
            eliminarProducto(item.id);
            return;
        }

        const existe = carrito.some((prod) => prod.id === item.id);

        if (existe) {
            const carritoActualizado = carrito.map((prod) => {
                if (prod.id === item.id) {
                    const nuevaCantidad = esEdicion ? cantidad : prod.cantidad + cantidad;
                    
                    return { 
                        ...prod, 
                        cantidad: nuevaCantidad > item.stock ? item.stock : nuevaCantidad 
                    };
                }
                return prod;
            });
            setCarrito(carritoActualizado);
        } else {
            setCarrito([...carrito, { ...item, cantidad }]);
        }
    };
    
    const eliminarProducto = (id) => {
        const carritoFiltrado = carrito.filter((prod) => prod.id !== id);
        setCarrito(carritoFiltrado);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const obtenerCantidadProducto = (id) => {
        const producto = carrito.find((prod) => prod.id === id);
        return producto ? producto.cantidad : 0; 
    };

    const obtenerCantidadTotal = () => {
        return carrito.reduce((acumulador, prod) => acumulador + prod.cantidad, 0);
    };

    const obtenerPrecioTotal = () => {
        return carrito.reduce((acumulador, prod) => acumulador + (prod.precio * prod.cantidad), 0);
    };

    const restarProducto = (id) => {
        const carritoActualizado = carrito.map((prod) => {
            if (prod.id === id && prod.cantidad > 1) {
                return { ...prod, cantidad: prod.cantidad - 1 };
            }
            return prod;
        });
        setCarrito(carritoActualizado);
    };
    
    return (
        <CarritoContext.Provider value={{ 
            carrito, 
            agregarCarrito, 
            restarProducto,
            eliminarProducto, 
            vaciarCarrito,
            obtenerCantidadProducto,
            obtenerCantidadTotal,
            obtenerPrecioTotal
        }}>
            {children}
        </CarritoContext.Provider>
    );
}