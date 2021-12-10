import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
//Rotas
import * as ROUTES from './constants/routes';
//Importação dinâmica
//Code splitting carrega apenas o necessário ao usuário
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const NotFound = lazy(() => import ('./pages/not-found'));
const Dashboard = lazy(() => import ('./pages/dashboard'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={ user }>
      <Router>
        <Suspense fallback={<p>Carregando...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense> {/* Especificando estado de carregamento */}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
