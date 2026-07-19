
import Heroe from "../components/layout/heroe/Heroe";
import ItemListContainer from "../components/productos/ItemListContainer";

function Home() {
    
    return (
        <>
            <Heroe />
            <ItemListContainer 
                mensaje="Productos Destacados"
                soloDestacados={true}
            />

        </>
    );
}

export default Home;