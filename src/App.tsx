import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Rotas
import * as ROUTES from './constants/routes';
//Importação dinâmica
//Code splitting carrega apenas o necessário ao usuário
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Carregando...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Routes>
      </Suspense> {/* Especificando estado de carregamento */}
    </Router>
  );
}

export default App;
