import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from "../context/firebase";
//Rotas
import * as ROUTES from '../constants/routes';
//Firebase translator
//import { setLanguage } from 'firebase-error-translator';
//Services
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
    //setLanguage('pt');
    //Navegação
    const navigate = useNavigate();
    //Contexto
    const { firebase } = useContext(FirebaseContext);
    //Dados de cadastro
    const [ username, setUsername ] = useState('');
    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    //Erros e validação
    const [ error, setError ] = useState('');
    const isInvalid = username === '' || fullName==='' || password === '' || email === '';
    //Handles
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleSignUp = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        //Verificações - Firebase verifica automaticamente o email
        const usernameExists = await doesUsernameExist(username);
        if(usernameExists.length === 0) {
            try {
                //Criando dados de autenticação
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                
                await createdUserResult.user.updateProfile({
                    displayName: username
                });
                //Guardando dados do usuário no firestore
                await firebase
                    .firestore()
                    .collection('users')
                    .add({
                        userId: createdUserResult.user.uid,
                        username: username,
                        fullName,
                        email: email.toLowerCase(),
                        following: [],
                        dateCreated: Date.now()
                    });

                navigate(ROUTES.DASHBOARD, {replace: true});
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch(err: any) {
                setEmail('');
                setFullName('');
                setUsername('');
                setPassword('');
                setError(err.message);
            }
        } else {
            setEmail('');
            setFullName('');
            setUsername('');
            setPassword('');
            setError('Nome de usuário já existe, por favor tente outro.');
        }
    };

    //Renderização
    useEffect(() => {
        document.title = 'Cadastro | Instagram';
    }, []);

    return (
        <div className="container flex justify-center mx-auto max-w-screen-md items-center h-screen">
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col bg-white p-4 border border-gray-primary
                    mb-4 pt-4">
                    <h1 className="flex justify-center w-full mb-2">
                        <img 
                            src="images/logo.png" 
                            alt="Instagram"
                            className="mt-2 w-6/12"
                        />
                    </h1>
                    <p className="text-center mb-10 text-gray-base
                    font-semibold">
                        Cadastre-se para ver fotos e vídeos dos seus amigos.
                    </p>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                    <form onSubmit={handleSignUp} method="POST">
                        <input
                            aria-label="Insira seu email"
                            placeholder="Email"
                            type="text"
                            id="email"
                            className="bg-gray-background text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 
                            border border-gray-primary rounded mb-2"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        <input
                            aria-label="Insira seu nome completo"
                            placeholder="Nome completo"
                            type="text"
                            id="fullName"
                            className="bg-gray-background text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 
                            border border-gray-primary rounded mb-2"
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                        />
                        <input
                            aria-label="Insira um nome de usuário"
                            placeholder="Nome de usuário"
                            type="text"
                            id="username"
                            className="bg-gray-background text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 
                            border border-gray-primary rounded mb-2"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                        <input
                            aria-label="Insira sua senha"
                            placeholder="Senha"
                            type="password"
                            id="password"
                            className=" bg-gray-background text-xs text-gray-base w-full mr-3 py-5 px-4 h-2 
                            border border-gray-primary rounded mb-2"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 
                            font-bold mt-2 mb-6 ${isInvalid && 'opacity-50'}`}
                        >Cadastre-se</button>
                        <div className="text-gray-base text-xs">
                            <p className="text-center">Ao se cadastrar, você concorda com nossos <strong>Termos, Política de Dados</strong> e <strong>Política de Cookies</strong>.</p>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full 
                bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Tem uma conta? <Link to="/login?source=auth_switcher" className="font-bold text-blue-medium">
                            Conecte-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}