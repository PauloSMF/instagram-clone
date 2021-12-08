import { createContext } from "react";

//Contexto (context) disponibiliza uma forma de passar dados 
//entre a árvore de componentes sem precisar passar props 
//manualmente em cada nível.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FirebaseContext = createContext<any | null>(null);
export default FirebaseContext;