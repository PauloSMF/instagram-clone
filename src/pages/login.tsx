import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FirebaseContext from "../context/firebase";
//Rotas
import * as ROUTES from '../constants/routes';
//Firebase translator
import { setLanguage, getTranslation } from 'firebase-error-translator';

export default function Login() {
    setLanguage('pt');
    //Navegação
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    //Contexto
    const { firebase } = useContext(FirebaseContext);
    //Dados de autenticação
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    //Erros e validação
    const [ error, setError ] = useState('');
    const isInvalid = password === '' || email === '';
    //Handles
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate(ROUTES.DASHBOARD, {replace: true});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any) {
            setEmail('');
            setPassword('');
            setError(getTranslation(err.code));
        }
    };

    //Renderização
    useEffect(() => {
        document.title = 'Login | Instagram';
    }, []);

    return (
        <div className="container flex justify-center mx-auto max-w-screen-md items-center h-screen">
            {!searchParams.has('source')  && <div className="flex w-3/5">
                <img 
                    src="images/iphone-with-profile.jpg" 
                    alt="Instagram em dispositivo móvel"
                />
            </div>}
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col bg-white p-4 border border-gray-primary
                    mb-4 pt-4">
                    <h1 className="flex justify-center w-full mb-10">
                        <img 
                            src="images/logo.png" 
                            alt="Instagram"
                            className="mt-2 w-6/12"
                        />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                    <form onSubmit={handleLogin} method="POST">
                        <input
                            aria-label="Insira seu email"
                            placeholder="Email"
                            type="text"
                            id="email"
                            className="bg-gray-background text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 
                            border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        <input
                            aria-label="Insira sua senha"
                            placeholder="Senha"
                            type="password"
                            id="password"
                            className=" bg-gray-background text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 
                            border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 
                            font-bold mt-2 ${isInvalid && 'opacity-50'}`}
                        >Entrar</button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full 
                bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Não tem uma conta? <Link to="/signup" className="font-bold text-blue-medium">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}