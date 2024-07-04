import { useDispatch } from 'react-redux';
import { setLoginState } from '~/store/slice/auth.slice';

const LogoutPage = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLoginState(false));
    };

    return (
        <div>
            <h1>Logout Page</h1>
            <button onClick={handleLogout}>Déconnexion</button>
        </div>
    );
};

export default LogoutPage;
