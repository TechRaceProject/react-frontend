import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/auth.context';
import { NavProvider, NavContext } from './context/nav.context';
import TopBar from '~/components/layout/topBar';
import Nav from '~/components/layout/nav';
import Footer from '~/components/layout/footer';
import Auth from '~/pages/auth';
import Home from '~/pages/home';
import Temp from '~/pages/temp';
import History from '~/pages/history';
import Err from '~/pages/err';
import './App.css';
import Graph from './pages/graph';

function AuthRoutes() {
    return (
        <Routes>
            <Route path="*" element={<Auth />} />
        </Routes>
    );
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/History" element={<History />} />
            <Route path="/Top" element={<Temp />} />
            <Route path="/Profil" element={<Temp />} />

            <Route path="/Graph" element={<Graph />} />

            <Route path="*" element={<Err />} />
        </Routes>
    );
}

function AppContent() {
    const { isLoggedIn } = useContext(AuthContext);
    const { isOpen } = useContext(NavContext);

    return (
        <div className={isOpen ? 'root-menu-open' : 'root-menu-closed'}>
            {isLoggedIn && <TopBar />}
            {isLoggedIn ? <MainRoutes /> : <AuthRoutes />}
            {isLoggedIn && <Footer />}
            {isLoggedIn && <Nav />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <NavProvider>
                <AppContent />
            </NavProvider>
        </AuthProvider>
    );
}

export default App;
