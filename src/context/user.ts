import { createContext } from "react";
//Criando contexto de usuário
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserContext = createContext<any | null>(null);
export default UserContext;