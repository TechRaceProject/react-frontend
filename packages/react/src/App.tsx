import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/auth.context';
import LoginPage from '~/pages/auth/login';
import RegisterPage from '~/pages/auth/register';
import Home from '~/pages/home';
import Err from '~/pages/err';
import './App.css';

function AuthRoutes() {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
        </Routes>
    );
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Err />} />
        </Routes>
    );
}

function AppContent() {
    const { isLoggedIn } = useContext(AuthContext);

    return <>{isLoggedIn ? <MainRoutes /> : <AuthRoutes />}</>;
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
