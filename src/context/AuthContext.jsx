
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); 
    const [userRol, setUserRol] = useState(null);
    const [loading, setLoading] = useState(true);

    const registrarUsuario = async (email, password) => {
        const credencial = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, "usuarios", credencial.user.uid), {
            email: email,
            rol: "cliente",
        });
        return credencial;
    };

    const iniciarSesion = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const cerrarSesion = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
  
                const docRef = doc(db, "usuarios", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserRol(docSnap.data().rol);
                } else {
                    setUserRol("cliente");
                }
            } else {
                setUser(null);
                setUserRol(null);
            }
            setLoading(false); 
        });

        return () => unsubscribe();
    }, []);

    const datosACompartir = {
        user,
        userRol,
        loading, 
        registrarUsuario,
        iniciarSesion,
        cerrarSesion,
    };

    return (
        <AuthContext.Provider value={datosACompartir}>
            {loading ? (
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    height: "100vh", 
                    fontFamily: "'Montserrat', sans-serif",
                    color: "var(--azul-medianoche)"
                }}>
                    <h3>Iniciando sesión...</h3>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}