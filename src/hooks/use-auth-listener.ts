//Verificação de contexto: usuário está logado ou não
import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('authUser') || '{}'));
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {   
        const listener = firebase.auth().onAuthStateChanged((authUser: unknown) => {
            if(authUser) {//Salvando usuário autenticado, se houver, em local storage
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {//Se não há usuário autenticado local storage é limpado 
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        //Limpando o listener quando não é mais necessário
        //Esta peração pode poupar o uso de memória
        return () => listener();
    }, [firebase]);

    return { user };
}