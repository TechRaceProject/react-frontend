import { useDispatch } from 'react-redux';
import { setLoginState } from '~/store/slice/auth.slice';

const LoginPage = () => {
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(setLoginState(true));
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Connexion</button>
        </div>
    );
};

export default LoginPage;
